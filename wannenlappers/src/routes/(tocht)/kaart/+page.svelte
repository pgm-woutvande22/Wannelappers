<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import InfoKaart from '#lib/components/InfoKaart.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import TochtKaart from '#lib/components/TochtKaart.svelte';
	import { stops } from '#lib/data/stops.js';
	import { tocht } from '#lib/state/tocht.svelte.js';

	const volgende = $derived(tocht.volgende);
	const onderweg = $derived([volgende.afstand, volgende.wegwijzer].filter(Boolean).join(' · '));
</script>

<svelte:head>
	<title>Kaart · De gescheurde wan</title>
</svelte:head>

<Scherm ingebed>
	<h1 class="visueel-verborgen">Kaart</h1>

	<TochtKaart {stops} status={(s) => tocht.status(s)} />

	<InfoKaart compact titel="Volgende: {volgende.inZin}" onderschrift={onderweg || undefined}>
		{#snippet voor()}
			<span class="cirkel"><Icoon naam={volgende.icoon} maat={24} /></span>
		{/snippet}
	</InfoKaart>

	{#snippet actie()}
		<!-- TODO: naar de opdracht van deze stop zodra scherm 5 bestaat. -->
		<Knop>We zijn bij {volgende.inZin}</Knop>
	{/snippet}
</Scherm>

<style>
	.cirkel {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--kleur-groen-donker);
		color: var(--kleur-wit);
	}
</style>
