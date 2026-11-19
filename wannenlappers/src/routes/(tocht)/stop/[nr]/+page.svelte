<script lang="ts">
	import { resolve } from '$app/paths';
	import InfoKaart from '#lib/components/InfoKaart.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import OefeningKaart from '#lib/components/OefeningKaart.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import SchermKop from '#lib/components/SchermKop.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const stop = $derived(data.stop);
</script>

<svelte:head>
	<title>{stop.naam} · De gescheurde wan</title>
</svelte:head>

<Scherm ingebed>
	<SchermKop klein label="Stop {stop.nr}" titel="We zijn bij {stop.inZin}" />

	{#if data.oefeningen?.length}
		{#each data.oefeningen as oefening (oefening.id)}
			<OefeningKaart {...oefening} />
		{/each}
	{:else}
		<InfoKaart
			titel={data.fout ? 'Even geen verbinding' : 'Nog geen opdracht'}
			onderschrift={data.fout
				? 'We konden de opdracht niet laden. Probeer het zo meteen opnieuw.'
				: 'Wannes is de opdracht voor deze stop nog aan het voorbereiden.'}
		/>
	{/if}

	{#snippet actie()}
		<Knop variant="secundair" href={resolve('/(tocht)/kaart')}>Terug naar de kaart</Knop>
	{/snippet}
</Scherm>
