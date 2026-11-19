<script lang="ts">
	import { enhance } from '$app/forms';
	import Foutmelding from '#lib/components/Foutmelding.svelte';

	interface Props {
		fout?: string;
		/** Pad van het zonet geüploade bestand, voor de bevestiging. */
		geupload?: string;
	}

	let { fout, geupload }: Props = $props();
	let bezig = $state(false);
	const id = $props.id();
</script>

<form
	class="paneel"
	method="POST"
	action="?/uploaden"
	enctype="multipart/form-data"
	use:enhance={() => {
		bezig = true;
		return async ({ update }) => {
			await update();
			bezig = false;
		};
	}}
>
	<h2>Bestand uploaden</h2>
	<div class="veld">
		<label for={id}>Audiobestand</label>
		<input
			{id}
			name="bestand"
			type="file"
			accept="audio/*"
			required
			aria-invalid={fout ? true : undefined}
			aria-describedby="{id}-hulp {id}-fout"
		/>
		<p id="{id}-hulp" class="hulp">
			MP3, M4A, WAV, OGG of WEBM, max. 20 MB. De naam wordt omgezet naar kleine letters zonder
			spaties.
		</p>
		<Foutmelding id="{id}-fout" tekst={fout} />
	</div>

	{#if geupload}
		<p class="melding" role="status">"{geupload}" is geüpload.</p>
	{/if}

	<div>
		<button class="knop" type="submit" disabled={bezig}>
			{bezig ? 'Bezig met uploaden…' : 'Uploaden'}
		</button>
	</div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
