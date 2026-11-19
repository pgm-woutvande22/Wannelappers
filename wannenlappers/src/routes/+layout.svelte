<script lang="ts">
	import { untrack } from 'svelte';
	import '#lib/styles/tokens.css';
	import '#lib/styles/base.css';
	import favicon from '#lib/assets/favicon.svg';
	import { opslag } from '#lib/state/opslag.svelte.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Na het laden (niet tijdens server-rendering) de bewaarde tocht terugzetten,
	// zodat de HTML van de server en de eerste weergave in de browser gelijk zijn.
	$effect(() => {
		untrack(() => opslag.herstel());
	});

	// Daarna elke wijziging (team, stempels, tocht-id) meteen bewaren.
	$effect(() => {
		if (opslag.hersteld) opslag.bewaar();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
