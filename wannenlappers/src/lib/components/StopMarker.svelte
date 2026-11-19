<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import { KAART, type Stop } from '#lib/data/stops.js';
	import type { StopStatus } from '#lib/state/tocht.svelte.js';

	interface Props {
		stop: Stop;
		status: StopStatus;
	}

	let { stop, status }: Props = $props();

	const statusTekst: Record<StopStatus, string> = {
		verzameld: 'gestempeld',
		volgende: 'volgende stop',
		open: 'nog te doen'
	};
</script>

<li
	class={['marker', status, { kist: !stop.stempel }]}
	style:left="{(stop.x / KAART.breedte) * 100}%"
	style:top="{(stop.y / KAART.hoogte) * 100}%"
>
	<span class="visueel-verborgen">Stop {stop.nr}, {stop.naam}: {statusTekst[status]}</span>
	{#if status === 'verzameld'}
		<Icoon naam="vinkje" maat={18} />
	{:else}
		<Icoon naam={stop.icoon} maat={status === 'volgende' ? 28 : 21} />
	{/if}
	<span class="nr" aria-hidden="true">{stop.nr}</span>
</li>

<style>
	.marker {
		--maat: 42px;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--maat);
		height: var(--maat);
		border: 2.5px solid var(--kleur-groen-donker);
		border-radius: 50%;
		background: var(--kleur-wit);
		color: var(--kleur-groen-donker);
		translate: -50% -50%;
	}

	.kist {
		border-color: var(--kleur-blauw);
		color: var(--kleur-blauw);
	}

	.volgende {
		--maat: 56px;
		border: 4px solid var(--kleur-wit);
		background: var(--kleur-groen-donker);
		color: var(--kleur-wit);
	}

	.verzameld {
		background: var(--kleur-groen-donker);
		color: var(--kleur-wit);
	}

	.nr {
		position: absolute;
		top: -4px;
		right: -4px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 10px;
	}

	.volgende .nr {
		top: -6px;
		right: -6px;
	}
</style>
