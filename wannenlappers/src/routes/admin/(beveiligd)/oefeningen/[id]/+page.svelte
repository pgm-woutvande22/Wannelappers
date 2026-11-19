<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import OefeningVelden from '#lib/components/admin/OefeningVelden.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	let bezig = $state(false);
	/** Verwijderen vraagt een tweede klik. */
	let bevestig = $state(false);

	const waarden = $derived((form && 'waarden' in form && form.waarden) || data.oefening);
	const fouten = $derived(form && 'fouten' in form ? form.fouten : undefined);
	const verwijderFout = $derived(form && 'verwijderFout' in form ? form.verwijderFout : undefined);
</script>

<svelte:head>
	<title>{data.oefening.titel} · Admin · De gescheurde wan</title>
</svelte:head>

<div class="pagina">
	<a class="terug" href={resolve('/admin/(beveiligd)/oefeningen')}>← Alle oefeningen</a>
	<h1>{data.oefening.titel}</h1>

	<form
		class="paneel"
		method="POST"
		action="?/opslaan"
		use:enhance={() => {
			bezig = true;
			return async ({ update }) => {
				await update({ reset: false });
				bezig = false;
			};
		}}
	>
		<OefeningVelden {waarden} {fouten} stops={data.stops} audio={data.audio} />

		<div class="knoppen">
			<button class="knop" type="submit" disabled={bezig}>
				{bezig ? 'Bezig…' : 'Wijzigingen opslaan'}
			</button>
			<a class="knop secundair" href={resolve('/admin/(beveiligd)/oefeningen')}>Annuleer</a>
		</div>
	</form>

	<section class="paneel gevarenzone" aria-labelledby="verwijder-titel">
		<h2 id="verwijder-titel">Oefening verwijderen</h2>
		<p>Dit kan je niet ongedaan maken. Wil je ze enkel verbergen? Vink dan "Zichtbaar in de app" uit.</p>
		{#if verwijderFout}<p class="melding fout" role="alert">{verwijderFout}</p>{/if}

		<form method="POST" action="?/verwijderen" use:enhance>
			{#if bevestig}
				<button class="knop gevaar" type="submit">Ja, verwijder definitief</button>
				<button class="knop secundair" type="button" onclick={() => (bevestig = false)}>
					Toch niet
				</button>
			{:else}
				<button class="knop gevaar" type="button" onclick={() => (bevestig = true)}>
					Verwijder oefening
				</button>
			{/if}
		</form>
	</section>
</div>

<style>
	.pagina {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 720px;
	}

	.terug {
		color: var(--kleur-blauw);
		font-weight: 700;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.knoppen,
	.gevarenzone form {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.gevarenzone {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
