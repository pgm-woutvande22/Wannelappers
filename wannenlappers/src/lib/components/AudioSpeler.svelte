<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import IcoonKnop from '#lib/components/IcoonKnop.svelte';

	interface Props {
		src: string;
		/** Waarnaar je luistert, bv. "het bericht van Wannes". */
		onderwerp: string;
		/**
		 * 'pil': witte pil met label en duur (Figma v5 "Luister").
		 * 'icoon': rond luidsprekerknopje (Figma v5, kop van Onderweg).
		 */
		variant?: 'pil' | 'icoon';
		/** Kleur van het ronde knopje. */
		kleur?: 'wit' | 'blauw';
		/** Zichtbare tekst van de pil. */
		label?: string;
		/** Duur in seconden, zodra die bekend is (met preload="metadata"). */
		duur?: number;
		/** "metadata" laadt enkel de duur vooraf; "none" laadt pas bij de eerste klik. */
		preload?: 'none' | 'metadata';
	}

	let {
		src,
		onderwerp,
		variant = 'icoon',
		kleur = 'wit',
		label = 'Luister',
		duur = $bindable(),
		preload = 'none'
	}: Props = $props();

	let gepauzeerd = $state(true);
	const wissel = () => (gepauzeerd = !gepauzeerd);

	const tijd = $derived(
		duur && Number.isFinite(duur)
			? `${Math.floor(duur / 60)}:${String(Math.round(duur % 60)).padStart(2, '0')}`
			: undefined
	);
</script>

<audio {src} {preload} bind:paused={gepauzeerd} bind:duration={duur}></audio>

{#if variant === 'pil'}
	<button class="pil" type="button" aria-pressed={!gepauzeerd} onclick={wissel}>
		<Icoon naam="speaker" maat={20} />
		<span class="label">{gepauzeerd ? label : 'Pauzeer'}</span>
		{#if tijd}<span class="tijd">{tijd}</span>{/if}
	</button>
{:else}
	<IcoonKnop
		icoon="speaker"
		{kleur}
		label={gepauzeerd ? `Luister naar ${onderwerp}` : `Pauzeer ${onderwerp}`}
		ingedrukt={!gepauzeerd}
		onclick={wissel}
	/>
{/if}

<style>
	.pil {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 14px 18px;
		border: none;
		border-radius: 26px;
		background: var(--kleur-wit);
		color: var(--kleur-inkt);
		font-family: var(--font-basis);
		line-height: 1.35;
		cursor: pointer;
		transition: background-color var(--overgang);
	}

	.pil:hover {
		background: var(--kleur-blauwtint);
	}

	.pil[aria-pressed='true'] {
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	.label {
		font-weight: 500;
		font-size: 16px;
	}

	.tijd {
		color: var(--kleur-subtiel);
		font-size: 14px;
	}

	.pil[aria-pressed='true'] .tijd {
		color: inherit;
		opacity: 0.8;
	}
</style>
