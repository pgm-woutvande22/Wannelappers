<script lang="ts">
	import { enhance } from '$app/forms';
	import Chip from '#lib/components/Chip.svelte';
	import Foutmelding from '#lib/components/Foutmelding.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import type { CodeSoort } from '#lib/types/database.js';

	interface Props {
		soort: Exclude<CodeSoort, 'geen'>;
		/** Aantal tekens van de code: zoveel vakjes. */
		lengte: number;
		/** Uitleg voor de volwassene, ingesteld in de admin. */
		uitleg?: string | null;
		onjuist: () => void;
		onsluit: () => void;
	}

	let { soort, lengte, uitleg, onjuist, onsluit }: Props = $props();

	let waarde = $state('');
	let bezig = $state(false);
	let fout = $state<string>();
	const id = $props.id();

	/** Vakjes alleen bij korte codes; anders één groot veld. */
	const vakjes = $derived(lengte >= 1 && lengte <= 6);
	const tekens = $derived(Array.from({ length: lengte }, (_, i) => waarde[i] ?? ''));
	const actief = $derived(Math.min(waarde.length, lengte - 1));
	const standaardUitleg = $derived(
		`Je ziet ${lengte} ${soort === 'cijfers' ? (lengte === 1 ? 'cijfer' : 'cijfers') : 'tekens'}. Typ ze hieronder.`
	);

	/** Als modaal openen: focus blijft in het paneel, Esc sluit, achtergrond is inert. */
	function open(dialoog: HTMLDialogElement) {
		dialoog.showModal();
		return () => dialoog.close();
	}

	/** Cursor meteen in het veld: de code verdwijnt na 30 seconden. */
	function focus(veld: HTMLInputElement) {
		veld.focus();
	}

	function opInvoer(event: Event & { currentTarget: HTMLInputElement }) {
		const schoon = event.currentTarget.value.replace(soort === 'cijfers' ? /\D/g : /\s/g, '');
		waarde = schoon.slice(0, lengte).toUpperCase();
		event.currentTarget.value = waarde;
		fout = undefined;
	}
</script>

<dialog
	class="paneel"
	aria-labelledby="{id}-titel"
	{@attach open}
	oncancel={(e) => {
		e.preventDefault();
		onsluit();
	}}
	onclick={(e) => {
		// Tik op de donkere achtergrond (buiten het paneel) sluit.
		if (e.target === e.currentTarget) onsluit();
	}}
>
	<form
		method="POST"
		action="?/code"
		novalidate
		use:enhance={() => {
			bezig = true;
			fout = undefined;
			return async ({ result, update }) => {
				bezig = false;
				if (result.type === 'success') {
					onjuist();
				} else if (result.type === 'failure') {
					const boodschap = result.data?.fout;
					fout = typeof boodschap === 'string' ? boodschap : 'Die code klopt niet.';
				} else {
					await update();
				}
			};
		}}
	>
		<span class="greep" aria-hidden="true"></span>

		<Chip variant="canvas" icoon="volwassene">Voor de volwassene</Chip>

		<h2 id="{id}-titel">Typ de code van het schermpje</h2>
		<p class="uitleg" id="{id}-uitleg">{uitleg || standaardUitleg}</p>

		<div class={['invoer', { 'met-vakjes': vakjes, fout }]}>
			<input
				id="{id}-code"
				name="code"
				type="text"
				inputmode={soort === 'cijfers' ? 'numeric' : 'text'}
				autocomplete="one-time-code"
				autocapitalize="characters"
				spellcheck="false"
				maxlength={lengte}
				enterkeyhint="go"
				aria-label="Code"
				aria-invalid={fout ? true : undefined}
				aria-describedby="{id}-uitleg {id}-fout"
				value={waarde}
				oninput={opInvoer}
				{@attach focus}
			/>
			{#if vakjes}
				<div class="vakjes" aria-hidden="true">
					{#each tekens as teken, i (i)}
						<span class={['vakje', { actief: i === actief && waarde.length < lengte, gevuld: teken }]}>
							{#if teken}{teken}{:else if i === actief}<span class="cursor"></span>{/if}
						</span>
					{/each}
				</div>
			{/if}
		</div>
		<div class="melding"><Foutmelding id="{id}-fout" tekst={fout} /></div>

		<div class="knoppen">
			<Knop type="submit" disabled={bezig || waarde.length === 0}>
				{bezig ? 'Even kijken…' : 'Controleer de code'}
			</Knop>
			<Knop variant="tekst" onclick={onsluit}>Annuleer</Knop>
		</div>
	</form>
</dialog>

<style>
	.paneel {
		inset: auto 0 0;
		width: 100%;
		max-width: 393px;
		max-height: 100dvh;
		margin: 0 auto;
		padding: 0;
		border: none;
		border-radius: 32px 32px 0 0;
		background: var(--kleur-wit);
		color: var(--kleur-inkt);
		font-family: var(--font-basis);
		animation: omhoog 220ms ease-out;
	}

	.paneel::backdrop {
		background: var(--kleur-overlay);
		animation: vervaag 220ms ease-out;
	}

	@keyframes omhoog {
		from {
			translate: 0 40%;
		}
	}

	@keyframes vervaag {
		from {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.paneel,
		.paneel::backdrop {
			animation: none;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 12px 24px calc(34px + env(safe-area-inset-bottom));
	}

	.greep {
		align-self: center;
		width: 40px;
		height: 5px;
		margin-bottom: 18px;
		border-radius: 3px;
		background: var(--kleur-track);
	}

	h2 {
		margin-top: 14px;
		font-weight: 500;
		font-size: 26px;
		line-height: 1.12;
		letter-spacing: -0.52px;
	}

	.uitleg {
		margin-top: 8px;
		color: var(--kleur-subtiel);
		font-size: 16px;
		line-height: 1.35;
	}

	.invoer {
		position: relative;
		width: 100%;
		margin-top: 22px;
	}

	input {
		width: 100%;
		height: 104px;
		padding: 0 16px;
		border: 2px solid var(--kleur-blauw);
		border-radius: 24px;
		background: var(--kleur-wit);
		color: var(--kleur-inkt);
		font-family: inherit;
		font-weight: 500;
		font-size: 44px;
		letter-spacing: 0.2em;
		text-align: center;
	}

	input:focus-visible {
		outline: 3px solid var(--kleur-blauwtint);
		outline-offset: 2px;
	}

	/* Met vakjes ligt het echte veld onzichtbaar over de vakjes heen (tikken opent het toetsenbord). */
	.met-vakjes input {
		position: absolute;
		inset: 0;
		z-index: 1;
		height: 100%;
		border-color: transparent;
		background: transparent;
		color: transparent;
		caret-color: transparent;
	}

	.met-vakjes input:focus-visible {
		outline: none;
	}

	.vakjes {
		display: flex;
		gap: 12px;
	}

	.vakje {
		display: flex;
		flex: 1 0 0;
		align-items: center;
		justify-content: center;
		min-width: 0;
		height: 104px;
		border: 2px solid transparent;
		border-radius: 24px;
		background: var(--kleur-canvas);
		font-weight: 500;
		font-size: 44px;
		line-height: 1.12;
		letter-spacing: -0.88px;
	}

	.vakje.actief {
		border-color: var(--kleur-blauw);
		background: var(--kleur-wit);
	}

	.met-vakjes:has(input:focus-visible) .vakje.actief {
		outline: 3px solid var(--kleur-blauwtint);
		outline-offset: 2px;
	}

	.cursor {
		width: 2.5px;
		height: 40px;
		background: var(--kleur-blauw);
		animation: knipper 1s steps(1) infinite;
	}

	@keyframes knipper {
		50% {
			opacity: 0;
		}
	}

	.fout .vakje,
	.fout:not(.met-vakjes) input {
		border-color: var(--kleur-fout);
	}

	.melding {
		margin-top: 10px;
	}

	.knoppen {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 100%;
		margin-top: 24px;
	}
</style>
