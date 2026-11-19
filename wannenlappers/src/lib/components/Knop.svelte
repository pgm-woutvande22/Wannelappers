<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primair' | 'secundair';
		/** Met href wordt de knop een link. */
		href?: string;
		type?: 'button' | 'submit';
		disabled?: boolean;
		onclick?: () => void;
		children: Snippet;
	}

	let {
		variant = 'primair',
		href,
		type = 'button',
		disabled = false,
		onclick,
		children
	}: Props = $props();
</script>

{#if href}
	<a class="knop {variant}" {href}>{@render children()}</a>
{:else}
	<button class="knop {variant}" {type} {disabled} {onclick}>{@render children()}</button>
{/if}

<style>
	.knop {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 56px;
		border-radius: var(--radius-klein);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 18px;
		text-decoration: none;
		cursor: pointer;
		transition:
			filter var(--overgang),
			background-color var(--overgang),
			transform var(--overgang);
	}

	.knop:hover:not(:disabled) {
		filter: brightness(1.15);
	}

	.secundair:hover:not(:disabled) {
		filter: none;
		background: var(--kleur-blauw-licht);
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
		border: none;
	}

	.secundair {
		background: var(--kleur-wit);
		color: var(--kleur-blauw);
		border: 2.5px solid var(--kleur-blauw);
	}
</style>
