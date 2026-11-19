<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import Navigatie, { type NavItem } from '#lib/components/Navigatie.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const items: NavItem[] = [
		{ label: 'Onderweg', icoon: 'thuis', href: resolve('/(tocht)/(nav)/onderweg') },
		{ label: 'Kaart', icoon: 'kaart', href: resolve('/(tocht)/(nav)/kaart') },
		{ label: 'Stempels', icoon: 'stempel', href: resolve('/(tocht)/(nav)/stempelkaart') },
		// TODO: href toevoegen zodra het hulpscherm bestaat.
		{ label: 'Hulp', icoon: 'hulp' }
	];

	// resolve() kan relatieve links geven ("./kaart"); vergelijk daarom op het volledige pad.
	const actief = $derived(
		items.find((i) => i.href && new URL(i.href, page.url.href).pathname === page.url.pathname)?.href ??
			''
	);
</script>

<div class="scherm">
	<main>
		{@render children()}
	</main>
	<div class="navigatie">
		<Navigatie {items} {actief} />
	</div>
</div>

<style>
	.scherm {
		position: relative;
		min-height: 100dvh;
	}

	/* Figma: inhoud begint 62px onder de bovenrand en laat 120px vrij voor de navigatie. */
	main {
		display: flex;
		flex-direction: column;
		padding: calc(16px + env(safe-area-inset-top)) 24px calc(120px + env(safe-area-inset-bottom));
	}

	.navigatie {
		position: fixed;
		right: 0;
		bottom: calc(24px + env(safe-area-inset-bottom));
		left: 0;
		z-index: 10;
		max-width: 393px;
		margin-inline: auto;
		padding-inline: 16px;
	}
</style>
