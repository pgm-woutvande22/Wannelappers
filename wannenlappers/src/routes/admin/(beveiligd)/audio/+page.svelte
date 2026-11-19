<script lang="ts">
	import { enhance } from '$app/forms';
	import AudioUpload from '#lib/components/admin/AudioUpload.svelte';
	import { formatDatum } from '#lib/utils/duur.js';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	/** Pad van het bestand waarvoor op "Verwijder" geklikt is (tweede klik bevestigt). */
	let bevestig = $state<string | undefined>();

	const kb = new Intl.NumberFormat('nl-BE', { maximumFractionDigits: 0 });
	const grootte = (bytes: number) =>
		bytes > 1024 * 1024
			? `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`
			: `${kb.format(bytes / 1024)} kB`;
</script>

<svelte:head>
	<title>Audio · Admin · De gescheurde wan</title>
</svelte:head>

<div class="pagina">
	<h1>Audio</h1>

	<AudioUpload
		fout={form && 'uploadFout' in form ? form.uploadFout : undefined}
		geupload={form && 'geupload' in form ? form.geupload : undefined}
	/>

	<section class="paneel" aria-labelledby="bestanden">
		<h2 id="bestanden">Bestanden</h2>

		{#if form && 'verwijderFout' in form}
			<p class="melding fout" role="alert">{form.verwijderFout}</p>
		{:else if form && 'verwijderd' in form}
			<p class="melding" role="status">"{form.verwijderd}" is verwijderd.</p>
		{/if}

		{#if data.bestanden.length === 0}
			<p class="leeg">Nog geen audiobestanden.</p>
		{:else}
			<table>
				<thead>
					<tr>
						<th scope="col">Naam</th>
						<th scope="col">Beluister</th>
						<th scope="col">Gebruikt bij</th>
						<th scope="col">Grootte</th>
						<th scope="col">Geüpload</th>
						<th scope="col"><span class="visueel-verborgen">Acties</span></th>
					</tr>
				</thead>
				<tbody>
					{#each data.bestanden as bestand (bestand.pad)}
						<tr>
							<td class="naam">{bestand.pad}</td>
							<td>
								<audio controls preload="none" src={bestand.url} aria-label="Beluister {bestand.pad}"
								></audio>
							</td>
							<td>
								{#if bestand.gebruiktDoor.length}
									{bestand.gebruiktDoor.join(', ')}
								{:else}
									<span class="leeg">niet gekoppeld</span>
								{/if}
							</td>
							<td class="getal">{grootte(bestand.grootte)}</td>
							<td>{bestand.bijgewerkt_op ? formatDatum(bestand.bijgewerkt_op) : '–'}</td>
							<td class="acties">
								<form
									method="POST"
									action="?/verwijderen"
									use:enhance={() =>
										async ({ update }) => {
											bevestig = undefined;
											await update();
										}}
								>
									<input type="hidden" name="pad" value={bestand.pad} />
									{#if bevestig === bestand.pad}
										<button class="knop gevaar klein" type="submit">Zeker?</button>
										<button
											class="knop secundair klein"
											type="button"
											onclick={() => (bevestig = undefined)}>Nee</button
										>
									{:else}
										<button
											class="knop gevaar klein"
											type="button"
											aria-label="Verwijder {bestand.pad}"
											disabled={bestand.gebruiktDoor.length > 0}
											title={bestand.gebruiktDoor.length > 0
												? 'Eerst loskoppelen van de oefening(en)'
												: undefined}
											onclick={() => (bevestig = bestand.pad)}
										>
											Verwijder
										</button>
									{/if}
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</section>
</div>

<style>
	.pagina {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 1100px;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.naam {
		font-weight: 700;
		overflow-wrap: anywhere;
	}

	audio {
		width: 220px;
		height: 36px;
	}

	.getal {
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}

	.acties form {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}

	.knop.klein {
		min-height: 32px;
		padding: 0 12px;
		font-size: 13px;
	}
</style>
