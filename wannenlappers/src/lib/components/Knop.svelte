<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icoon from '#lib/components/Icoon.svelte';
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	interface Props {
		/** Figma v5: "Knop / primair" (blauw) en "Knop / tekst" (zonder vlak). */
		variant?: 'primair' | 'secundair' | 'tekst';
		/** Met href wordt de knop een link. */
		href?: string;
		type?: 'button' | 'submit';
		disabled?: boolean;
		/** Icoon links van de tekst, bv. 'play'. */
		icoon?: IcoonNaam;
		onclick?: () => void;
		children: Snippet;
	}

	let {
		variant = 'primair',
		href,
		type = 'button',
		disabled = false,
		icoon,
		onclick,
		children
	}: Props = $props();
</script>

{#snippet inhoud()}
	{#if icoon}<Icoon naam={icoon} maat={18} />{/if}
	{@render children()}
{/snippet}

{#if href}
	<a class="knop {variant}" {href}>{@render inhoud()}</a>
{:else}
	<button class="knop {variant}" {type} {disabled} {onclick}>{@render inhoud()}</button>
{/if}

<style>
	.knop {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		width: 100%;
		height: 60px;
		padding: 0 20px;
		border: none;
		border-radius: 30px;
		font-family: var(--font-basis);
		font-weight: 500;
		font-size: 17px;
		line-height: 1.35;
		text-decoration: none;
		cursor: pointer;
		transition:
			filter var(--overgang),
			background-color var(--overgang),
			transform var(--overgang);
	}

	.knop:active:not(:disabled) {
		transform: scale(0.98);
	}

	.knop:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.primair {
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	.primair:hover:not(:disabled) {
		filter: brightness(1.15);
	}

	.secundair {
		background: var(--kleur-wit);
		color: var(--kleur-inkt);
	}

	.secundair:hover:not(:disabled) {
		background: var(--kleur-blauwtint);
	}

	.tekst {
		height: 48px;
		border-radius: 24px;
		background: none;
		color: var(--kleur-inkt);
		font-size: 16px;
	}

	.tekst:hover:not(:disabled) {
		background: rgb(14 27 40 / 0.05);
	}
</style>
