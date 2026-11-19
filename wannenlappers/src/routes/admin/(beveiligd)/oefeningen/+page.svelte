<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<svelte:head>
	<title>Oefeningen · Admin · De gescheurde wan</title>
</svelte:head>

<div class="pagina">
	<header>
		<h1>Oefeningen</h1>
		<a class="knop" href={resolve('/admin/(beveiligd)/oefeningen/nieuw')}>Nieuwe oefening</a>
	</header>

	{#if form?.fout}
		<p class="melding fout" role="alert">{form.fout}</p>
	{/if}

	{#each data.stops as stop (stop.nr)}
		<section class="paneel" aria-labelledby="stop-{stop.nr}">
			<div class="stopkop">
				<h2 id="stop-{stop.nr}">Stop {stop.nr} · {stop.naam}</h2>
				<a
					class="knop secundair klein"
					href="{resolve('/admin/(beveiligd)/oefeningen/nieuw')}?stop={stop.nr}"
					aria-label="Nieuwe oefening bij {stop.naam}">+ Oefening</a
				>
			</div>

			{#if stop.oefeningen.length === 0}
				<p class="leeg">Nog geen oefeningen bij deze stop.</p>
			{:else}
				<table>
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Titel</th>
							<th scope="col">Foto's</th>
							<th scope="col">Audio</th>
							<th scope="col">Status</th>
							<th scope="col"><span class="visueel-verborgen">Acties</span></th>
						</tr>
					</thead>
					<tbody>
						{#each stop.oefeningen as oefening (oefening.id)}
							<tr class={{ inactief: !oefening.actief }}>
								<td class="nr">{oefening.volgorde}</td>
								<td>
									<a href={resolve('/admin/(beveiligd)/oefeningen/[id]', { id: oefening.id })}>
										{oefening.titel}
									</a>
								</td>
								<td>{oefening.oefening_fotos.length}</td>
								<td>{oefening.audio_pad ?? '–'}</td>
								<td>
									<form method="POST" action="?/wisselActief" use:enhance>
										<input type="hidden" name="id" value={oefening.id} />
										<input type="hidden" name="actief" value={String(!oefening.actief)} />
										<button
											class="knop secundair klein"
											type="submit"
											aria-label="{oefening.actief ? 'Verberg' : 'Toon'} {oefening.titel}"
										>
											{oefening.actief ? 'Zichtbaar' : 'Verborgen'}
										</button>
									</form>
								</td>
								<td class="acties">
									<a
										class="knop secundair klein"
										href={resolve('/admin/(beveiligd)/oefeningen/[id]', { id: oefening.id })}
										aria-label="Bewerk {oefening.titel}"
									>
										Bewerk
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</section>
	{/each}
</div>

<style>
	.pagina {
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-width: 1100px;
	}

	header,
	.stopkop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.nr {
		width: 48px;
		color: var(--kleur-grijs);
		font-variant-numeric: tabular-nums;
	}

	td a:not(.knop) {
		color: var(--kleur-blauw);
		font-weight: 700;
	}

	.inactief td {
		color: var(--kleur-grijs);
	}

	.acties {
		text-align: right;
	}

	.knop.klein {
		min-height: 32px;
		padding: 0 12px;
		font-size: 13px;
	}
</style>
