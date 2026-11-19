<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import { AANTAL_STOPS, type Stop } from '#lib/data/stops.js';
	import type { StopStatus } from '#lib/state/tocht.svelte.js';

	interface Props {
		teamnaam: string;
		stops: Stop[];
		volgende: Stop;
		status: (stop: Stop) => StopStatus;
	}

	let { teamnaam, stops, volgende, status }: Props = $props();

	const statusTekst: Record<StopStatus, string> = {
		verzameld: 'gestempeld',
		volgende: 'volgende',
		open: 'nog te doen'
	};
</script>

<header class="voortgang">
	<div class="rij">
		<p class="team">{teamnaam}</p>
		<p class="stop">Stop {volgende.nr} van {AANTAL_STOPS}</p>
	</div>
	<ol class="stempels" aria-label="Voortgang">
		{#each stops as stop, i (stop.nr)}
			{@const s = status(stop)}
			{#if i > 0}
				<li class={['lijn', { klaar: status(stops[i - 1]) === 'verzameld' }]} aria-hidden="true"></li>
			{/if}
			<li class={['stempel', s]}>
				<span class="visueel-verborgen">{stop.naam}: {statusTekst[s]}</span>
				{#if s === 'verzameld'}
					<Icoon naam="vinkje" maat={18} />
				{:else}
					<Icoon naam={stop.icoon} maat={stop.stempel ? 17 : 18} />
				{/if}
			</li>
		{/each}
	</ol>
</header>

<style>
	.voortgang {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: calc(env(safe-area-inset-top) + 16px) var(--ruimte-scherm) 12px;
	}

	.rij {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	.team {
		overflow: hidden;
		color: var(--kleur-groen-donker);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 13px;
		letter-spacing: 1.56px;
		text-overflow: ellipsis;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.stop {
		flex-shrink: 0;
		padding: 6px 12px;
		border-radius: var(--radius-pil);
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 14px;
	}

	.stempels {
		display: flex;
		align-items: center;
		padding: 0;
		list-style: none;
	}

	.stempel {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--kleur-blauw-licht);
		color: var(--kleur-grijs);
	}

	.volgende {
		border: 2.5px solid var(--kleur-groen-donker);
		background: var(--kleur-wit);
		color: var(--kleur-groen-donker);
	}

	.verzameld {
		background: var(--kleur-groen-donker);
		color: var(--kleur-wit);
	}

	.lijn {
		flex: 1;
		height: 4px;
		border-radius: 2px;
		background: var(--kleur-blauw-licht);
	}

	.lijn.klaar {
		background: var(--kleur-groen-donker);
	}
</style>
