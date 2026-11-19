<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Met onsubmit wordt de inhoud een formulier. */
		onsubmit?: (event: SubmitEvent) => void;
		/** Inhoud die onderaan het scherm staat, bv. de hoofdknop. */
		actie?: Snippet;
		children: Snippet;
	}

	let { onsubmit, actie, children }: Props = $props();
</script>

{#snippet inhoud()}
	{@render children()}
	{#if actie}
		<div class="actie">{@render actie()}</div>
	{/if}
{/snippet}

<main class="scherm">
	{#if onsubmit}
		<form class="inhoud" {onsubmit} novalidate>{@render inhoud()}</form>
	{:else}
		<div class="inhoud">{@render inhoud()}</div>
	{/if}
</main>

<style>
	.scherm {
		display: flex;
		max-width: 393px;
		min-height: 100dvh;
		margin: 0 auto;
		padding: 6px var(--ruimte-scherm) 34px;
	}

	.inhoud {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--ruimte-blok);
	}

	.actie {
		margin-top: auto;
		padding-top: var(--ruimte-blok);
	}
</style>
