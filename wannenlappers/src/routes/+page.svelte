<script lang="ts">
	import { resolve } from '$app/paths';
	import AudioSpeler from '#lib/components/AudioSpeler.svelte';
	import InfoKaart from '#lib/components/InfoKaart.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import TochtKop from '#lib/components/TochtKop.svelte';
	import UitlegLijst, { type Uitleg } from '#lib/components/UitlegLijst.svelte';
	import { opslag } from '#lib/state/opslag.svelte.js';
	import { team } from '#lib/state/team.svelte.js';
	import { tocht } from '#lib/state/tocht.svelte.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/** Opnieuw beginnen wist alle stempels: eerst bevestigen. */
	let bevestigWissen = $state(false);

	/** Duur van het bericht in seconden, zodra de browser die kent. */
	let duur = $state<number>();
	const onderschrift = $derived(
		duur && Number.isFinite(duur)
			? `Luister samen · ${Math.floor(duur / 60)}:${String(Math.round(duur % 60)).padStart(2, '0')}`
			: 'Luister samen'
	);

	const stappen: Uitleg[] = [
		{ icoon: 'kaart', tekst: 'Volg de kaart naar elke stop.' },
		{ icoon: 'speaker', tekst: 'Luister naar de opdracht en zoek samen.' },
		{ icoon: 'stempel', tekst: 'Vul de code in en verdien een stempel.' },
		{ icoon: 'kist', tekst: 'Met 4 stempels open je de schatkist.' }
	];
</script>

<svelte:head>
	<title>De gescheurde wan</title>
</svelte:head>

<Scherm>
	<TochtKop
		soort="Stempeltocht"
		plaats="Wannenlappersbos · Zingem"
		titel="De gescheurde wan"
		beschrijving="Help Wannes Laps zijn wan te lappen. Een stempeltocht voor het hele gezin."
		kenmerken={['6 stops', '1,8 km', '± 1 uur', '4–12 jaar']}
	/>

	{#if data.introUrl}
		{@const introUrl = data.introUrl}
		<InfoKaart titel="Bericht van Wannes" {onderschrift}>
			{#snippet na()}
				<AudioSpeler
					src={introUrl}
					onderwerp="het bericht van Wannes"
					kleur="blauw"
					preload="metadata"
					bind:duur
				/>
			{/snippet}
		</InfoKaart>
	{/if}

	<UitlegLijst titel="Zo werkt het" {stappen} />

	{#snippet actie()}
		{#if opslag.bezig}
			<p class="terug" role="status">
				Welkom terug{team.naam ? `, ${team.naam}` : ''}! Jullie hebben {tocht.aantal} van
				{tocht.totaal}
				{tocht.aantal === 1 ? 'stempel' : 'stempels'}.
			</p>
			<Knop href={resolve('/(tocht)/(nav)/onderweg')} icoon="play">Verder met de tocht</Knop>
			{#if bevestigWissen}
				<p class="waarschuwing">Alle stempels op dit toestel gaan verloren.</p>
				<Knop
					variant="tekst"
					onclick={() => {
						opslag.wis();
						bevestigWissen = false;
					}}>Ja, opnieuw beginnen</Knop
				>
				<Knop variant="tekst" onclick={() => (bevestigWissen = false)}>Toch niet</Knop>
			{:else}
				<Knop variant="tekst" onclick={() => (bevestigWissen = true)}>Opnieuw beginnen</Knop>
			{/if}
		{:else}
			<Knop href={resolve('/team')} icoon="play">Start de zoektocht</Knop>
		{/if}
	{/snippet}
</Scherm>

<style>
	.terug {
		margin-bottom: 12px;
		font-weight: 500;
		font-size: 17px;
		line-height: 1.35;
		text-align: center;
	}

	.waarschuwing {
		margin-top: 8px;
		color: var(--kleur-fout);
		font-size: 14px;
		text-align: center;
	}
</style>
