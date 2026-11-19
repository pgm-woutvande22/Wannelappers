<script lang="ts">
	import jijNauwkeurigheid from '#lib/assets/jij-nauwkeurigheid.svg';
	import jijPunt from '#lib/assets/jij-punt.svg';
	import ondergrond from '#lib/assets/kaart-ondergrond.svg';
	import StopMarker from '#lib/components/StopMarker.svelte';
	import { JIJ, KAART, type Stop } from '#lib/data/stops.js';
	import type { StopStatus } from '#lib/state/tocht.svelte.js';

	interface Props {
		stops: Stop[];
		status: (stop: Stop) => StopStatus;
	}

	let { stops, status }: Props = $props();

	const jij = {
		x: `${(JIJ.x / KAART.breedte) * 100}%`,
		y: `${(JIJ.y / KAART.hoogte) * 100}%`
	};
</script>

<div class="kaart">
	<img class="ondergrond" src={ondergrond} alt="" width={KAART.breedte} height={KAART.hoogte} />

	<span class="jij" style:left={jij.x} style:top={jij.y}>
		<img src={jijNauwkeurigheid} alt="" width="52" height="52" />
		<img class="punt" src={jijPunt} alt="" width="20" height="20" />
		<span class="jij-label">Jij bent hier</span>
	</span>

	<ol class="markers" aria-label="Stops op de kaart">
		{#each stops as stop (stop.nr)}
			<StopMarker {stop} status={status(stop)} />
		{/each}
	</ol>
</div>

<style>
	.kaart {
		position: relative;
		width: 100%;
		aspect-ratio: 345 / 418;
		overflow: hidden;
		border: 1.5px solid var(--kleur-lijn);
		border-radius: 20px;
	}

	.ondergrond {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.markers {
		position: absolute;
		inset: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.jij {
		position: absolute;
		width: 52px;
		height: 52px;
		translate: -50% -50%;
	}

	.jij img {
		position: absolute;
		inset: 0;
	}

	.jij .punt {
		inset: 16px;
	}

	.jij-label {
		position: absolute;
		left: 40px;
		top: 32px;
		padding: 3px 8px;
		border-radius: 6px;
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 11px;
		white-space: nowrap;
	}
</style>
