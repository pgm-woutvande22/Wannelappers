<script lang="ts">
	import { resolve } from '$app/paths';
	import AudioBericht from '#lib/components/AudioBericht.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import StappenLijst from '#lib/components/StappenLijst.svelte';
	import TochtKop from '#lib/components/TochtKop.svelte';
	import Vak from '#lib/components/Vak.svelte';

	const stappen = [
		'Luister naar het bericht van Wannes.',
		'Volg de kaart en los bij elke stop een opdracht op.',
		'Verzamel 4 stempels en open de schatkist.'
	];
</script>

<svelte:head>
	<title>De gescheurde wan</title>
</svelte:head>

<Scherm>
	<TochtKop
		lint="Stempeltocht"
		titel="De gescheurde wan"
		beschrijving="Een stempeltocht voor het hele gezin door het Wannenlappersbos in Zingem."
		kenmerken={['6 stops', '1,8 km', '± 1 uur']}
	/>

	<Vak titel="Bericht van Wannes Laps">
		{#snippet extra()}0:45{/snippet}
		<AudioBericht tekst="Luister eerst samen naar de missie." />
	</Vak>

	<Vak titel="Zo werkt het" kleur="groen">
		<StappenLijst {stappen} />
	</Vak>

	{#snippet actie()}
		<Knop href={resolve('/team')}>Start de zoektocht</Knop>
	{/snippet}
</Scherm>
