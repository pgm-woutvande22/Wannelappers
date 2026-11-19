<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<span class="chip">{@render children()}</span>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		padding: 5px 12px;
		border: 1.5px solid currentColor;
		border-radius: var(--radius-pil);
		font-weight: 700;
		font-size: 15px;
		white-space: nowrap;
	}
</style>
