<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import TabBalk, { type Tab } from '#lib/components/TabBalk.svelte';
	import Voortgang from '#lib/components/Voortgang.svelte';
	import { stops } from '#lib/data/stops.js';
	import { team } from '#lib/state/team.svelte.js';
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

	const tabs: Tab[] = [
		{ label: 'Kaart', icoon: 'kaart', href: resolve('/(tocht)/kaart') },
		{ label: 'Stempelkaart', icoon: 'kaartje', href: resolve('/(tocht)/stempelkaart') },
		// TODO: href toevoegen zodra het hulpscherm bestaat.
		{ label: 'Hulp', icoon: 'hulp' }
	];
</script>

<div class="tocht">
	<Voortgang
		teamnaam={team.naam || 'Jullie team'}
		{stops}
		volgende={tocht.volgende}
		status={(s) => tocht.status(s)}
	/>
	<main>
		{@render children()}
	</main>
	<TabBalk {tabs} actief={page.url.pathname} />
</div>

<style>
	.tocht {
		display: flex;
		flex-direction: column;
		max-width: 393px;
		min-height: 100dvh;
		margin: 0 auto;
	}

	main {
		display: flex;
		flex: 1;
		flex-direction: column;
	}
</style>
