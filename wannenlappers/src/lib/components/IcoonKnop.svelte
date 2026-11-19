<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	interface Props {
		icoon: IcoonNaam;
		/** Verplicht: er is geen zichtbare tekst. */
		label: string;
		/** Diameter van de cirkel in px (Figma: 36, 44, 48 of 60). */
		maat?: number;
		icoonMaat?: number;
		kleur?: 'wit' | 'blauw' | 'canvas';
		/** Met href een link, met onclick een knop, zonder beide een decoratief rondje. */
		href?: string;
		onclick?: () => void;
		/** Bij een toggle, bv. audio die speelt. */
		ingedrukt?: boolean;
	}

	let {
		icoon,
		label,
		maat = 48,
		icoonMaat = 22,
		kleur = 'wit',
		href,
		onclick,
		ingedrukt
	}: Props = $props();
</script>

{#if href}
	<a class="rond {kleur}" style:--maat="{maat}px" {href} aria-label={label}>
		<Icoon naam={icoon} maat={icoonMaat} />
	</a>
{:else if onclick}
	<button
		class="rond {kleur}"
		style:--maat="{maat}px"
		type="button"
		aria-label={label}
		aria-pressed={ingedrukt}
		{onclick}
	>
		<Icoon naam={icoon} maat={icoonMaat} />
	</button>
{:else}
	<span class="rond {kleur}" style:--maat="{maat}px" aria-hidden="true">
		<Icoon naam={icoon} maat={icoonMaat} />
	</span>
{/if}

<style>
	.rond {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: var(--maat);
		height: var(--maat);
		padding: 0;
		border: none;
		border-radius: 50%;
		color: var(--kleur-inkt);
		text-decoration: none;
		transition:
			filter var(--overgang),
			transform var(--overgang);
	}

	a.rond,
	button.rond {
		cursor: pointer;
	}

	a.rond:active,
	button.rond:active {
		transform: scale(0.95);
	}

	.wit {
		background: var(--kleur-wit);
	}

	.canvas {
		background: var(--kleur-canvas);
	}

	.blauw {
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	a.rond:hover,
	button.rond:hover {
		filter: brightness(0.96);
	}

	.blauw:is(a, button):hover {
		filter: brightness(1.15);
	}
</style>
