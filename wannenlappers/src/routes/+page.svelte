<script lang="ts">
	import { resolve } from '$app/paths';
	import AudioSpeler from '#lib/components/AudioSpeler.svelte';
	import InfoKaart from '#lib/components/InfoKaart.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import TochtKop from '#lib/components/TochtKop.svelte';
	import UitlegLijst, { type Uitleg } from '#lib/components/UitlegLijst.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

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
		<Knop href={resolve('/team')} icoon="play">Start de zoektocht</Knop>
	{/snippet}
</Scherm>
