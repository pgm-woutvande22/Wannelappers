<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icoon from '#lib/components/Icoon.svelte';
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	interface Props {
		/**
		 * 'rand': omlijnd (startscherm, v4).
		 * 'wit' / 'canvas': gevuld pilletje uit Figma v5, op een gekleurde of witte ondergrond.
		 */
		variant?: 'rand' | 'wit' | 'canvas';
		icoon?: IcoonNaam;
		children: Snippet;
	}

	let { variant = 'rand', icoon, children }: Props = $props();
</script>

<span class="chip {variant}">
	{#if icoon}<Icoon naam={icoon} maat={16} />{/if}
	{@render children()}
</span>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
	}

	.rand {
		padding: 5px 12px;
		border: 1.5px solid currentColor;
		border-radius: var(--radius-pil);
		font-weight: 700;
		font-size: 15px;
	}

	.wit,
	.canvas {
		gap: 6px;
		padding: 7px 14px 7px 10px;
		border-radius: 99px;
		color: var(--kleur-inkt);
		font-family: var(--font-basis);
		font-weight: 500;
		font-size: 14px;
		line-height: 1.35;
	}

	/* Zonder icoon is de linkermarge even groot als de rechter. */
	.wit:not(:has(:global(.icoon))),
	.canvas:not(:has(:global(.icoon))) {
		padding-left: 14px;
	}

	.wit {
		background: var(--kleur-wit);
	}

	.canvas {
		background: var(--kleur-canvas);
	}
</style>
