<script lang="ts">
	import { enhance } from '$app/forms';
	import AdminVeld from '#lib/components/admin/AdminVeld.svelte';

	interface Props {
		fotos: { id: string; url: string; beschrijving: string }[];
		fout?: string;
		/** Beschrijving terugzetten na een mislukte upload. */
		beschrijving?: string;
	}

	let { fotos, fout, beschrijving = '' }: Props = $props();

	let bezig = $state(false);
	/** Id van de foto waarvoor op "Verwijder" geklikt is (tweede klik bevestigt). */
	let bevestig = $state<string | undefined>();
</script>

<section class="paneel" aria-labelledby="fotos-titel">
	<h2 id="fotos-titel">Foto's</h2>

	{#if fout}<p class="melding fout" role="alert">{fout}</p>{/if}

	{#if fotos.length === 0}
		<p class="leeg">Nog geen foto's bij deze oefening.</p>
	{:else}
		<ol class="fotos">
			{#each fotos as foto, i (foto.id)}
				<li>
					<img src={foto.url} alt={foto.beschrijving} loading="lazy" />

					<form class="beschrijving" method="POST" action="?/fotoBijwerken" use:enhance={() =>
						async ({ update }) => update({ reset: false })}>
						<input type="hidden" name="id" value={foto.id} />
						<AdminVeld label="Beschrijving foto {i + 1}">
							{#snippet children(attr)}
								<input {...attr} name="beschrijving" maxlength={300} value={foto.beschrijving} />
							{/snippet}
						</AdminVeld>
						<button class="knop secundair klein" type="submit">Bewaar</button>
					</form>

					<div class="acties">
						<form method="POST" action="?/fotoVerplaatsen" use:enhance>
							<input type="hidden" name="id" value={foto.id} />
							<button
								class="knop secundair klein"
								name="richting"
								value="omhoog"
								disabled={i === 0}
								aria-label="Foto {i + 1} naar voren">↑</button
							>
							<button
								class="knop secundair klein"
								name="richting"
								value="omlaag"
								disabled={i === fotos.length - 1}
								aria-label="Foto {i + 1} naar achteren">↓</button
							>
						</form>

						<form
							method="POST"
							action="?/fotoVerwijderen"
							use:enhance={() =>
								async ({ update }) => {
									bevestig = undefined;
									await update();
								}}
						>
							<input type="hidden" name="id" value={foto.id} />
							{#if bevestig === foto.id}
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
									aria-label="Verwijder foto {i + 1}"
									onclick={() => (bevestig = foto.id)}>Verwijder</button
								>
							{/if}
						</form>
					</div>
				</li>
			{/each}
		</ol>
	{/if}

	<form
		class="toevoegen"
		method="POST"
		action="?/fotoToevoegen"
		enctype="multipart/form-data"
		use:enhance={() => {
			bezig = true;
			return async ({ update }) => {
				await update();
				bezig = false;
			};
		}}
	>
		<h3>Foto toevoegen</h3>
		<div class="rij">
			<AdminVeld label="Foto" hulp="JPG, PNG, WEBP of AVIF, max. 10 MB.">
				{#snippet children(attr)}
					<input {...attr} name="foto" type="file" accept="image/*" required />
				{/snippet}
			</AdminVeld>
			<AdminVeld label="Beschrijving" hulp="Wat staat er op de foto? (voor schermlezers)">
				{#snippet children(attr)}
					<input {...attr} name="beschrijving" maxlength={300} required value={beschrijving} />
				{/snippet}
			</AdminVeld>
		</div>
		<div>
			<button class="knop" type="submit" disabled={bezig}>
				{bezig ? 'Bezig met uploaden…' : 'Foto toevoegen'}
			</button>
		</div>
	</form>
</section>

<style>
	section,
	.toevoegen {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.fotos {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 0;
		list-style: none;
	}

	li {
		display: grid;
		grid-template-columns: 120px 1fr auto;
		gap: 16px;
		align-items: center;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--kleur-lijn);
	}

	img {
		width: 120px;
		aspect-ratio: 4 / 3;
		border-radius: var(--radius-klein);
		object-fit: cover;
		background: var(--kleur-blauw-licht);
	}

	.beschrijving {
		display: flex;
		align-items: flex-end;
		gap: 8px;
	}

	.beschrijving :global(.veld) {
		flex: 1;
	}

	.acties,
	.acties form {
		display: flex;
		gap: 6px;
	}

	.acties {
		gap: 16px;
	}

	.toevoegen {
		padding-top: 8px;
	}

	h3 {
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 16px;
	}

	.rij {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.knop.klein {
		min-height: 32px;
		padding: 0 12px;
		font-size: 13px;
	}
</style>
