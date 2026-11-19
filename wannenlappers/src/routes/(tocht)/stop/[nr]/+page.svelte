<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import AudioSpeler from '#lib/components/AudioSpeler.svelte';
	import Chip from '#lib/components/Chip.svelte';
	import CodePaneel from '#lib/components/CodePaneel.svelte';
	import Icoon from '#lib/components/Icoon.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import OefeningKaart from '#lib/components/OefeningKaart.svelte';
	import OpdrachtKop from '#lib/components/OpdrachtKop.svelte';
	import OpdrachtStappen from '#lib/components/OpdrachtStappen.svelte';
	import { stops } from '#lib/data/stops.js';
	import { tocht } from '#lib/state/tocht.svelte.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const stop = $derived(data.stop);
	const oefeningen = $derived(data.oefeningen ?? []);
	/** De eerste oefening is de opdracht van het scherm; eventuele extra's komen eronder. */
	const opdracht = $derived(oefeningen[0]);
	const extra = $derived(oefeningen.slice(1));
	const foto = $derived(opdracht?.fotos[0]);
	const gestempeld = $derived(tocht.verzameld.has(stop.nr));
	const code = $derived(data.code);

	let codeOpen = $state(false);
	let hintOpen = $state(false);

	function stempel() {
		tocht.verzameld.add(stop.nr);
		goto(resolve('/(tocht)/stop/[nr]/gestempeld', { nr: String(stop.nr) }));
	}
</script>

<svelte:head>
	<title>{opdracht?.titel ?? stop.naam} · De gescheurde wan</title>
</svelte:head>

<div class="scherm" inert={codeOpen}>
	<OpdrachtKop
		titel={stop.stempel ? `Stop ${stop.nr} van ${stops.length}` : stop.naam}
		terugHref={resolve('/(tocht)/(nav)/onderweg')}
		onhulp={opdracht?.hint ? () => (hintOpen = !hintOpen) : undefined}
		hulpOpen={hintOpen}
	/>

	<div class="illustratie">
		{#if foto}
			<img class="foto" src={foto.url} alt={foto.beschrijving} />
		{:else if stop.illustratie}
			<img class="tekening" src={stop.illustratie} alt="" width="300" height="220" />
		{:else}
			<span class="icoon"><Icoon naam={stop.icoon} maat={26} /></span>
		{/if}
		<span class="chip"><Chip variant="wit" icoon="kind">Voor het kind</Chip></span>
	</div>

	{#if opdracht}
		<h2 class="opdracht">{opdracht.tekst || opdracht.titel}</h2>
		{#if opdracht.stappen.length}
			<div class="stappen"><OpdrachtStappen stappen={opdracht.stappen} /></div>
		{/if}
		{#if opdracht.audioUrl}
			<div class="luister">
				<AudioSpeler
					src={opdracht.audioUrl}
					onderwerp="Wannes"
					variant="pil"
					label="Luister naar Wannes"
					preload="metadata"
				/>
			</div>
		{/if}
		{#if hintOpen && opdracht.hint}
			<p class="hint" role="status"><strong>Hint:</strong> {opdracht.hint}</p>
		{/if}
		{#each extra as oefening (oefening.id)}
			<div class="extra"><OefeningKaart {...oefening} /></div>
		{/each}
	{:else}
		<p class="leeg" role="status">
			{data.fout
				? 'We konden de opdracht niet laden. Probeer het zo meteen opnieuw.'
				: 'Wannes is de opdracht voor deze stop nog aan het voorbereiden.'}
		</p>
	{/if}

	<div class="acties">
		{#if gestempeld}
			<Knop href={resolve('/(tocht)/stop/[nr]/gestempeld', { nr: String(stop.nr) })}>
				Bekijk jullie stempel
			</Knop>
		{:else if code.soort !== 'geen'}
			<Knop onclick={() => (codeOpen = true)}>We hebben de code</Knop>
		{:else}
			<Knop href={resolve('/(tocht)/(nav)/kaart')}>Terug naar de kaart</Knop>
		{/if}
		{#if opdracht?.hint && !gestempeld}
			<Knop variant="tekst" onclick={() => (hintOpen = !hintOpen)}>
				{hintOpen ? 'Verberg de hint' : 'Hint nodig?'}
			</Knop>
		{/if}
	</div>
</div>

{#if codeOpen && code.soort !== 'geen'}
	<CodePaneel
		soort={code.soort}
		lengte={code.lengte}
		uitleg={code.uitleg}
		onjuist={stempel}
		onsluit={() => (codeOpen = false)}
	/>
{/if}

<style>
	.scherm {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		padding: calc(16px + env(safe-area-inset-top)) 24px calc(34px + env(safe-area-inset-bottom));
	}

	.illustratie {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		height: 290px;
		margin-top: 16px;
		overflow: hidden;
		border-radius: 32px;
		background: var(--kleur-groentint);
	}

	.foto {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Figma: knotwilg van 300×220, 16px boven de onderrand. */
	.tekening {
		margin-bottom: 16px;
	}

	.icoon {
		display: flex;
		align-self: center;
		scale: 3;
		color: var(--kleur-groen-donker);
	}

	.chip {
		position: absolute;
		top: 16px;
		left: 16px;
	}

	.opdracht {
		margin-top: 22px;
		font-weight: 500;
		font-size: 28px;
		line-height: 1.15;
		letter-spacing: -0.56px;
	}

	.stappen,
	.luister,
	.hint,
	.extra {
		margin-top: 16px;
	}

	.hint {
		padding: 14px 18px;
		border-radius: 20px;
		background: var(--kleur-blauwtint);
		font-size: 16px;
		line-height: 1.35;
	}

	.hint strong {
		font-weight: 600;
	}

	.leeg {
		margin-top: 22px;
		color: var(--kleur-subtiel);
		font-size: 17px;
		line-height: 1.35;
	}

	.acties {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: auto;
		padding-top: 24px;
	}
</style>
