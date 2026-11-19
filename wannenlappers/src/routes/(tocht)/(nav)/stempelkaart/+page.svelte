<script lang="ts">
	import IcoonKnop from '#lib/components/IcoonKnop.svelte';
	import KistCode from '#lib/components/KistCode.svelte';
	import StempelVak from '#lib/components/StempelVak.svelte';
	import { team } from '#lib/state/team.svelte.js';
	import { tocht } from '#lib/state/tocht.svelte.js';

	const nogTeGaan = $derived(tocht.totaal - tocht.aantal);
	const cijfers = $derived(
		tocht.stempelStops.map((s) => (tocht.verzameld.has(s.nr) ? s.cijfer : undefined))
	);
</script>

<svelte:head>
	<title>Stempels · De gescheurde wan</title>
</svelte:head>

<h1>Stempels</h1>
<p class="intro">
	{tocht.aantal} van {tocht.totaal}{team.naam ? ` · ${team.naam}` : ''}
</p>

<ul class="raster">
	{#each tocht.stempelStops as stop (stop.nr)}
		<li><StempelVak {stop} status={tocht.status(stop)} /></li>
	{/each}
</ul>

<section class="schatkist" aria-labelledby="kist-titel">
	<div class="kop">
		<IcoonKnop icoon="kist" label="" maat={44} />
		<div class="tekst">
			<h2 id="kist-titel">Schatkist</h2>
			<p>
				{tocht.kistOpen
					? 'Alle stempels! De kist mag open.'
					: `Nog ${nogTeGaan} ${nogTeGaan === 1 ? 'stempel' : 'stempels'}`}
			</p>
		</div>
	</div>
	<KistCode {cijfers} maat="vol" />
</section>

<style>
	h1 {
		font-weight: 500;
		font-size: 32px;
		line-height: 1.12;
		letter-spacing: -0.64px;
	}

	.intro {
		margin-top: 4px;
		color: var(--kleur-subtiel);
		font-size: 16px;
		line-height: 1.35;
	}

	.raster {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin: 22px 0 12px;
		padding: 0;
		list-style: none;
	}

	.raster li {
		display: flex;
	}

	.schatkist {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px;
		border-radius: 28px;
		background: var(--kleur-blauwtint);
	}

	.kop {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.tekst {
		display: flex;
		flex-direction: column;
		gap: 1px;
		line-height: 1.35;
	}

	h2 {
		font-weight: 500;
		font-size: 17px;
	}

	.tekst p {
		color: var(--kleur-subtiel);
		font-size: 14px;
	}
</style>
