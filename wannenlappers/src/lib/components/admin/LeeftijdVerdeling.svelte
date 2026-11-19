<script lang="ts">
	interface Props {
		leeftijden: { leeftijd: number; aantal: number }[];
	}

	let { leeftijden }: Props = $props();

	const max = $derived(Math.max(1, ...leeftijden.map((l) => l.aantal)));
</script>

{#if leeftijden.length === 0}
	<p class="leeg">Nog geen kinderen geregistreerd.</p>
{:else}
	<table>
		<thead>
			<tr>
				<th scope="col">Leeftijd</th>
				<th scope="col">Kinderen</th>
			</tr>
		</thead>
		<tbody>
			{#each leeftijden as { leeftijd, aantal } (leeftijd)}
				<tr>
					<td class="leeftijd">{leeftijd} jaar</td>
					<td>
						<span class="balk">
							<span class="vulling" style:width="{(aantal / max) * 100}%"></span>
							<span class="aantal">{aantal}</span>
						</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	.leeftijd {
		width: 90px;
		white-space: nowrap;
	}

	.balk {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.vulling {
		height: 14px;
		min-width: 4px;
		border-radius: var(--radius-pil);
		background: var(--kleur-groen-donker);
	}

	.aantal {
		font-variant-numeric: tabular-nums;
		font-weight: 700;
	}
</style>
