<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import type { Stop } from '#lib/data/stops.js';

	interface Props {
		stop: Stop;
		/** Breedte en hoogte in px (Figma: 210 groot, 104 op de stempelkaart). */
		maat?: number;
		/** Draaiing in graden, zoals een echte stempel die scheef staat. */
		draai?: number;
	}

	let { stop, maat = 210, draai = 0 }: Props = $props();

	const id = $props.id();
</script>

<!-- Alles is getekend op 210×210 (de Figma-stempel) en schaalt mee. -->
<div
	class="stempel"
	style:width="{maat}px"
	style:height="{maat}px"
	style:rotate="{draai}deg"
	role="img"
	aria-label="Stempel van stop {stop.nr}, {stop.naam}"
>
	{#if stop.inktstempel}
		<img src={stop.inktstempel} alt="" width={maat} height={maat} />
	{:else}
		<svg class="ring" viewBox="0 0 210 210" aria-hidden="true">
			<circle cx="105" cy="105" r="99" fill="none" stroke-width="9" stroke-dasharray="26 4" />
			<circle cx="105" cy="105" r="84" fill="none" stroke-width="2.5" />
		</svg>
		<span class="icoon" style:--schaal={maat / 210}>
			<Icoon naam={stop.icoon} maat={56} />
		</span>
	{/if}

	<svg class="tekst" viewBox="0 0 210 210" aria-hidden="true">
		<defs>
			<!-- Bovenaan met de klok mee, onderaan tegen de klok in: zo staat alles rechtop. -->
			<path id="{id}-boven" d="M 43 105 A 62 62 0 0 1 167 105" />
			<path id="{id}-onder" d="M 31 105 A 74 74 0 0 0 179 105" />
		</defs>
		<text class="boven">
			<textPath href="#{id}-boven" startOffset="50%">STOP {stop.nr}</textPath>
		</text>
		<text class="onder">
			<textPath href="#{id}-onder" startOffset="50%">{stop.naam.toUpperCase()}</textPath>
		</text>
	</svg>
</div>

<style>
	.stempel {
		position: relative;
		flex-shrink: 0;
		color: var(--kleur-blauw);
	}

	img,
	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.ring circle {
		stroke: currentColor;
	}

	.icoon {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		scale: var(--schaal);
	}

	text {
		fill: currentColor;
		opacity: 0.9;
		font-family: var(--font-basis);
		font-weight: 600;
		text-anchor: middle;
	}

	.boven {
		font-size: 16.8px;
		letter-spacing: 2.35px;
	}

	.onder {
		font-size: 13.65px;
		letter-spacing: 1.91px;
	}
</style>
