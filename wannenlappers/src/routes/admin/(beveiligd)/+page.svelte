<script lang="ts">
	import LeeftijdVerdeling from '#lib/components/admin/LeeftijdVerdeling.svelte';
	import StatTegel from '#lib/components/admin/StatTegel.svelte';
	import { formatDatum, formatDuur, secondenTussen } from '#lib/utils/duur.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const s = $derived(data.statistieken);
	const getal = new Intl.NumberFormat('nl-BE', { maximumFractionDigits: 1 });
</script>

<svelte:head>
	<title>Overzicht · Admin · De gescheurde wan</title>
</svelte:head>

<div class="pagina">
	<h1>Overzicht</h1>

	<dl class="tegels">
		<StatTegel
			label="Tochten"
			waarde={getal.format(s.aantal_tochten)}
			onderschrift="{getal.format(s.aantal_afgerond)} afgerond"
		/>
		<StatTegel
			label="Gemiddelde duur"
			waarde={s.gemiddelde_duur_seconden === null ? '–' : formatDuur(s.gemiddelde_duur_seconden)}
			onderschrift="van afgeronde tochten"
		/>
		<StatTegel label="Kinderen" waarde={getal.format(s.aantal_kinderen)} />
		<StatTegel
			label="Gemiddelde leeftijd"
			waarde={s.gemiddelde_leeftijd === null ? '–' : `${getal.format(s.gemiddelde_leeftijd)} jaar`}
		/>
	</dl>

	<div class="kolommen">
		<section class="paneel" aria-labelledby="recent">
			<h2 id="recent">Recente tochten</h2>
			{#if data.tochten.length === 0}
				<p class="leeg">Nog geen tochten.</p>
			{:else}
				<table>
					<thead>
						<tr>
							<th scope="col">Gestart</th>
							<th scope="col">Duur</th>
							<th scope="col">Leeftijden</th>
						</tr>
					</thead>
					<tbody>
						{#each data.tochten as tocht (tocht.id)}
							<tr>
								<td>{formatDatum(tocht.gestart_op)}</td>
								<td>
									{#if tocht.beeindigd_op}
										{formatDuur(secondenTussen(tocht.gestart_op, tocht.beeindigd_op))}
									{:else}
										<span class="leeg">bezig of gestopt</span>
									{/if}
								</td>
								<td>{tocht.leeftijden.join(', ')}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</section>

		<section class="paneel" aria-labelledby="leeftijden">
			<h2 id="leeftijden">Leeftijden</h2>
			<LeeftijdVerdeling leeftijden={data.leeftijden} />
		</section>
	</div>
</div>

<style>
	.pagina {
		display: flex;
		flex-direction: column;
		gap: 24px;
		max-width: 1100px;
	}

	.tegels {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin: 0;
	}

	.kolommen {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 16px;
		align-items: start;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
