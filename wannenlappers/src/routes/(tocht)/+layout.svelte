<script lang="ts">
	import { resolve } from '$app/paths';
	import { tocht } from '#lib/state/tocht.svelte.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Zodra alle stempels verzameld zijn, is de tocht klaar: einde één keer doorgeven
	// zodat de admin de duur kan zien. Mislukt het, dan merken de kinderen er niets van.
	$effect(() => {
		if (!tocht.kistOpen || !tocht.id || tocht.afgemeld) return;
		tocht.afgemeld = true;
		fetch(resolve('/api/tocht/einde'), {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ id: tocht.id })
		}).catch(() => {});
	});
</script>

<!-- Figma v5: alle tocht-schermen staan op het canvas, in Figtree. -->
<div class="tocht">
	{@render children()}
</div>

<style>
	.tocht {
		min-height: 100dvh;
		background: var(--kleur-canvas);
		color: var(--kleur-inkt);
		font-family: var(--font-basis);
	}

	/* Op een breed scherm: telefoonbreedte in het midden. */
	.tocht > :global(*) {
		max-width: 393px;
		margin-inline: auto;
	}
</style>
