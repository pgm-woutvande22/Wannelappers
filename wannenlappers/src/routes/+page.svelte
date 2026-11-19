<script lang="ts">
	import { resolve } from '$app/paths';
	import InfoKaart from '#lib/components/InfoKaart.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import Luisterknop from '#lib/components/Luisterknop.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import TochtKop from '#lib/components/TochtKop.svelte';
	import UitlegLijst, { type Uitleg } from '#lib/components/UitlegLijst.svelte';

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

	<div class="bericht">
		<InfoKaart titel="Bericht van Wannes" onderschrift="Luister samen · 0:45">
			{#snippet na()}
				<!-- TODO: audiobestand koppelen. -->
				<Luisterknop uitleg="Luister naar het bericht van Wannes" />
			{/snippet}
		</InfoKaart>
	</div>

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
