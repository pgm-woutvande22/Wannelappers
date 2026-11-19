<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import type { Stop } from '#lib/data/stops.js';
	import type { StopStatus } from '#lib/state/tocht.svelte.js';

	interface Props {
		stops: Stop[];
		status: (stop: Stop) => StopStatus;
	}

	let { stops, status }: Props = $props();

	const statusTekst: Record<StopStatus, string> = {
		verzameld: 'gestempeld',
		volgende: 'nu aan de beurt',
		open: 'nog te doen'
	};
</script>

<!-- Figma v5 "Stops": de vertrekplaats is altijd gedaan; de huidige stop is een hoge blauwe pil. -->
<ol class="stops" aria-label="Stops van de tocht">
	<li class="stop">
		<span class="label">Start</span>
		<span class="rond gedaan"><Icoon naam="vinkje" maat={20} /></span>
		<span class="visueel-verborgen">: vertrokken</span>
	</li>
	{#each stops as stop (stop.nr)}
		{@const s = status(stop)}
		<li class="stop" aria-current={s === 'volgende' ? 'step' : undefined}>
			{#if s === 'volgende'}
				<span class="huidig">
					<span class="label">{stop.kort}</span>
					{#if stop.stempel}
						<span class="nr">{stop.nr}</span>
					{:else}
						<Icoon naam={stop.icoon} maat={22} />
					{/if}
				</span>
			{:else}
				<span class="label">{stop.kort}</span>
				<span class={['rond', { gedaan: s === 'verzameld' }]}>
					{#if s === 'verzameld'}
						<Icoon naam="vinkje" maat={20} />
					{:else if stop.stempel}
						<span class="nr">{stop.nr}</span>
					{:else}
						<Icoon naam={stop.icoon} maat={22} />
					{/if}
				</span>
			{/if}
			<span class="visueel-verborgen">: stop {stop.nr}, {stop.naam}, {statusTekst[s]}</span>
		</li>
	{/each}
</ol>

<style>
	.stops {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.stop {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.label {
		color: var(--kleur-subtiel);
		font-size: 13px;
		line-height: 1.35;
		white-space: nowrap;
	}

	.rond {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 20px;
		color: var(--kleur-inkt);
	}

	.rond.gedaan {
		background: var(--kleur-groen-donker);
		color: var(--kleur-wit);
	}

	.nr {
		font-weight: 500;
		font-size: 19px;
		line-height: 1.35;
	}

	.huidig {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		width: 56px;
		height: 88px;
		padding: 14px 12px;
		border-radius: 28px;
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	.huidig .label {
		color: inherit;
		font-weight: 500;
	}

	.huidig .nr {
		font-weight: 600;
		font-size: 20px;
	}
</style>
