<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import KistCode from '#lib/components/KistCode.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import SchermKop from '#lib/components/SchermKop.svelte';
	import StempelVak from '#lib/components/StempelVak.svelte';
	import Vak from '#lib/components/Vak.svelte';
	import { stops } from '#lib/data/stops.js';
	import { team } from '#lib/state/team.svelte.js';
	import { tocht } from '#lib/state/tocht.svelte.js';

	const kist = stops.find((s) => !s.stempel);
	const nogTeGaan = $derived(tocht.totaal - tocht.aantal);
	const kistTekst = $derived(
		tocht.kistOpen
			? 'Alle stempels verzameld! De kist mag open.'
			: `Nog ${nogTeGaan} ${nogTeGaan === 1 ? 'stempel' : 'stempels'}, dan gaat de kist open.`
	);
	const cijfers = $derived(
		tocht.stempelStops.map((s) => (tocht.verzameld.has(s.nr) ? s.cijfer : undefined))
	);
</script>

<svelte:head>
	<title>Stempelkaart · De gescheurde wan</title>
</svelte:head>

<Scherm ingebed>
	<SchermKop klein titel={team.naam ? `Stempelkaart van ${team.naam}` : 'Jullie stempelkaart'} />

	<ul class="raster">
		{#each tocht.stempelStops as stop (stop.nr)}
			<li><StempelVak {stop} status={tocht.status(stop)} /></li>
		{/each}
	</ul>

	{#if kist}
		<Vak titel="#{kist.nr} {kist.naam}" kleur="licht" icoon={tocht.kistOpen ? undefined : 'slot'} compact>
			<p class="kist">
				<Icoon naam="kist" maat={32} />
				{kistTekst}
			</p>
		</Vak>
	{/if}

	<KistCode {cijfers} />
</Scherm>

<style>
	.raster {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.raster li {
		display: flex;
	}

	.kist {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 16px;
		line-height: 1.25;
	}

	.kist :global(.icoon) {
		color: var(--kleur-grijs);
	}
</style>
