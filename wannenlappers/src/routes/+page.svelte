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
		{ icoon: 'pin', tekst: 'Volg de kaart naar elke stop.' },
		{ icoon: 'speaker', tekst: 'Luister naar de opdracht en zoek samen.' },
		{ icoon: 'stempel', tekst: 'Vul de code in en verdien een stempel.' },
		{ icoon: 'kist', tekst: 'Met 4 stempels open je de schatkist.' }
	];
</script>

<svelte:head>
	<title>De gescheurde wan</title>
</svelte:head>

<Scherm ruimte={18}>
	{#snippet kop()}
		<TochtKop
			lint="Stempeltocht"
			titel="De gescheurde wan"
			beschrijving="Help Wannes Laps zijn wan te lappen. Een stempeltocht voor het hele gezin in het Wannenlappersbos."
			kenmerken={['6 stops', '1,8 km', '± 1 uur', '4–12 jaar']}
		/>
	{/snippet}

	{#if data.introUrl}
		{@const introUrl = data.introUrl}
		<div class="bericht">
			<InfoKaart titel="Bericht van Wannes" {onderschrift}>
				{#snippet na()}
					<AudioSpeler
						src={introUrl}
						onderwerp="het bericht van Wannes"
						preload="metadata"
						bind:duur
					/>
				{/snippet}
			</InfoKaart>
		</div>
	{/if}

	<UitlegLijst titel="Zo werkt het" {stappen} />

	{#snippet actie()}
		<Knop href={resolve('/team')}>Start de zoektocht</Knop>
	{/snippet}
</Scherm>

<style>
	.bericht {
		padding-top: 12px;
	}
</style>
