<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Met onsubmit wordt de inhoud een formulier. */
		onsubmit?: (event: SubmitEvent) => void;
		/** Volle breedte bovenaan, zonder zijmarge (bv. de blauwe kop op het startscherm). */
		kop?: Snippet;
		/** Inhoud die onderaan het scherm staat, bv. de hoofdknop. */
		actie?: Snippet;
		/**
		 * true binnen een layout die zelf al <main>, kop en tabbalk heeft:
		 * dan vult het scherm de beschikbare hoogte in plaats van het hele venster.
		 */
		ingebed?: boolean;
		/** Ruimte tussen de blokken. */
		ruimte?: number;
		children: Snippet;
	}

	let { onsubmit, kop, actie, ingebed = false, ruimte, children }: Props = $props();
</script>

{#snippet inhoud()}
	{@render children()}
	{#if actie}
		<div class="actie">{@render actie()}</div>
	{/if}
{/snippet}

<svelte:element
	this={ingebed ? 'div' : 'main'}
	class={['scherm', { ingebed }]}
	style:--ruimte={ruimte === undefined ? undefined : `${ruimte}px`}
>
	{#if kop}{@render kop()}{/if}
	{#if onsubmit}
		<form class="inhoud" {onsubmit} novalidate>{@render inhoud()}</form>
	{:else}
		<div class="inhoud">{@render inhoud()}</div>
	{/if}
</svelte:element>

<style>
	.scherm {
		display: flex;
		flex-direction: column;
		max-width: 393px;
		min-height: 100dvh;
		margin: 0 auto;
	}

	.scherm.ingebed {
		flex: 1;
		width: 100%;
		min-height: 0;
	}

	.inhoud {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--ruimte, var(--ruimte-blok));
		padding: 12px var(--ruimte-scherm) 34px;
	}

	.ingebed .inhoud {
		padding: 0 var(--ruimte-scherm) 12px;
	}

	.actie {
		margin-top: auto;
		padding-top: var(--ruimte-blok);
	}
</style>
