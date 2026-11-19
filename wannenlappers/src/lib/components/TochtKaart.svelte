<script lang="ts">
	import type { Snippet } from 'svelte';
	import jijNauwkeurigheid from '#lib/assets/jij-nauwkeurigheid.svg';
	import jijPunt from '#lib/assets/jij-punt.svg';
	import ondergrond from '#lib/assets/kaart-ondergrond.svg';
	import StopMarker from '#lib/components/StopMarker.svelte';
	import { JIJ, KAART, type Stop } from '#lib/data/stops.js';
	import type { StopStatus } from '#lib/state/tocht.svelte.js';

	interface Props {
		stops: Stop[];
		status: (stop: Stop) => StopStatus;
		/** Link van de volgende stop (de enige klikbare marker). */
		volgendeHref?: string;
		/** Kaartje onderaan over de kaart, bv. de volgende stop. */
		onder?: Snippet;
	}

	let { stops, status, volgendeHref, onder }: Props = $props();

	const pct = (waarde: number, totaal: number) => `${(waarde / totaal) * 100}%`;
</script>

<div class="kaart">
	<img class="ondergrond" src={ondergrond} alt="" width={KAART.breedte} height={KAART.hoogte} />

	<span class="jij" style:left={pct(JIJ.x, KAART.breedte)} style:top={pct(JIJ.y, KAART.hoogte)}>
		<img src={jijNauwkeurigheid} alt="" width="56" height="56" />
		<img class="punt" src={jijPunt} alt="" width="20" height="20" />
		<span class="visueel-verborgen">Jij bent hier</span>
	</span>

	<ol class="markers" aria-label="Stops op de kaart">
		{#each stops as stop (stop.nr)}
			{@const s = status(stop)}
			<StopMarker {stop} status={s} href={s === 'volgende' ? volgendeHref : undefined} />
		{/each}
	</ol>

	{#if onder}
		<div class="onder">{@render onder()}</div>
	{/if}
</div>

<style>
	.kaart {
		position: relative;
		width: 100%;
		aspect-ratio: 345 / 540;
		overflow: hidden;
		border-radius: 28px;
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
		width: 56px;
		height: 56px;
		translate: -50% -50%;
	}

	.jij img {
		position: absolute;
		inset: 0;
	}

	.jij .punt {
		inset: 18px;
	}

	.onder {
		position: absolute;
		right: 12px;
		bottom: 12px;
		left: 12px;
	}
</style>
