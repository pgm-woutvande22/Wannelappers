<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Met onsubmit wordt de inhoud een formulier. */
		onsubmit?: (event: SubmitEvent) => void;
		/** Inhoud die onderaan het scherm staat, bv. de hoofdknop. */
		actie?: Snippet;
		/** Ruimte tussen de blokken. */
		ruimte?: number;
		children: Snippet;
	}

	let { onsubmit, actie, ruimte, children }: Props = $props();
</script>

{#snippet inhoud()}
	{@render children()}
	{#if actie}
		<div class="actie">{@render actie()}</div>
	{/if}
{/snippet}

<!-- Schermen buiten de tocht (start, team) in de stijl van Figma v5: canvas, Figtree. -->
<main class="scherm" style:--ruimte={ruimte === undefined ? undefined : `${ruimte}px`}>
	{#if onsubmit}
		<form class="inhoud" {onsubmit} novalidate>{@render inhoud()}</form>
	{:else}
		<div class="inhoud">{@render inhoud()}</div>
	{/if}
</main>

<style>
	.scherm {
		display: flex;
		flex-direction: column;
		max-width: 393px;
		min-height: 100dvh;
		margin: 0 auto;
		background: var(--kleur-canvas);
		color: var(--kleur-inkt);
		font-family: var(--font-basis);
	}

	/* Ook naast de smalle kolom het canvas, op een breed scherm. */
	:global(body:has(.scherm)) {
		background: var(--kleur-canvas);
	}

	.inhoud {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--ruimte, 16px);
		padding: calc(16px + env(safe-area-inset-top)) 24px calc(34px + env(safe-area-inset-bottom));
	}

	.actie {
		display: flex;
		flex-direction: column;
		margin-top: auto;
		padding-top: 8px;
	}
</style>
