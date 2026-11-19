<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import OefeningVelden from '#lib/components/admin/OefeningVelden.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	let bezig = $state(false);
</script>

<svelte:head>
	<title>Nieuwe oefening · Admin · De gescheurde wan</title>
</svelte:head>

<div class="pagina">
	<a class="terug" href={resolve('/admin/(beveiligd)/oefeningen')}>← Alle oefeningen</a>
	<h1>Nieuwe oefening</h1>

	<form
		class="paneel"
		method="POST"
		enctype="multipart/form-data"
		use:enhance={() => {
			bezig = true;
			return async ({ update }) => {
				await update({ reset: false });
				bezig = false;
			};
		}}
	>
		<OefeningVelden
			waarden={form?.waarden ?? data.oefening}
			fouten={form?.fouten}
			stops={data.stops}
			audio={data.audio}
		/>

		<div class="knoppen">
			<button class="knop" type="submit" disabled={bezig}>
				{bezig ? 'Bezig…' : "Opslaan en foto's toevoegen"}
			</button>
			<a class="knop secundair" href={resolve('/admin/(beveiligd)/oefeningen')}>Annuleer</a>
		</div>
	</form>
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

	.knoppen {
		display: flex;
		gap: 12px;
	}
</style>
