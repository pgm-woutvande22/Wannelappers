<script lang="ts">
	import KistCode from '#lib/components/KistCode.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import SchermKop from '#lib/components/SchermKop.svelte';
	import StempelVak from '#lib/components/StempelVak.svelte';
	import TochtKaart from '#lib/components/TochtKaart.svelte';
	import Vak from '#lib/components/Vak.svelte';
	import { stops } from '#lib/data/stops.js';
	import { team } from '#lib/state/team.svelte.js';
	import { tocht } from '#lib/state/tocht.svelte.js';

	/** Stop die gekozen is op de kaart of de stempelkaart; standaard de volgende. */
	let gekozen = $state<number>();

	// TODO: echte cijfers per stop invullen zodra de opdrachten bekend zijn.
	const cijfers = $derived(tocht.stempelStops.map(() => undefined));
</script>

<svelte:head>
	<title>Stempeltocht · De gescheurde wan</title>
</svelte:head>

<Scherm>
	<SchermKop lint="Stempeltocht" titel={team.naam || 'Jullie tocht'} />

	<TochtKaart {stops} volgende={tocht.volgende} bind:gekozen afstand="120 m" />

	<Vak titel="Stempelkaart" icoon="team">
		{#snippet extra()}{tocht.aantal} van {tocht.totaal}{/snippet}
		<div class="stapel">
			<div class="stempels">
				{#each stops as stop (stop.nr)}
					<StempelVak
						{stop}
						verzameld={tocht.verzameld.has(stop.nr)}
						volgende={stop.nr === tocht.volgende.nr}
						gekozen={stop.nr === (gekozen ?? tocht.volgende.nr)}
						opSlot={!stop.stempel && !tocht.kistOpen}
						onkies={() => (gekozen = stop.nr)}
					/>
				{/each}
			</div>
			<KistCode {cijfers} />
		</div>
	</Vak>

	{#snippet actie()}
		<!-- TODO: naar de opdracht van de volgende stop zodra scherm 5 bestaat. -->
		<Knop>Ik ben bij stop {tocht.volgende.nr}</Knop>
	{/snippet}
</Scherm>

<style>
	.stapel {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.stempels {
		display: flex;
		gap: 2px;
		margin: -6px;
	}
</style>
