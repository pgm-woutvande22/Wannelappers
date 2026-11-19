<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import type { Stop } from '#lib/data/stops.js';

	interface Props {
		stop: Stop;
		verzameld?: boolean;
		volgende?: boolean;
		gekozen?: boolean;
		/** Voor de schatkist: nog op slot. */
		opSlot?: boolean;
		onkies: () => void;
	}

	let {
		stop,
		verzameld = false,
		volgende = false,
		gekozen = false,
		opSlot = false,
		onkies
	}: Props = $props();

	const icoon = $derived(
		volgende && stop.stempelIcoonVolgende ? stop.stempelIcoonVolgende : stop.stempelIcoon
	);
	const status = $derived(
		verzameld ? 'gestempeld' : volgende ? 'volgende' : opSlot ? 'op slot' : 'nog niet gestempeld'
	);
</script>

<button
	type="button"
	class={['stempel', { verzameld, volgende, gekozen }]}
	aria-pressed={gekozen}
	aria-label="Stop {stop.nr}: {stop.naam}, {status}"
	onclick={onkies}
>
	<span class="cirkel">
		<Icoon naam={icoon} />
		{#if opSlot}
			<span class="slot"><Icoon naam="slot" /></span>
		{/if}
	</span>
	<span class="naam">{stop.naam}</span>
	<span class="status" aria-hidden="true">
		{#if volgende}Volgende{:else}#{stop.nr}{/if}
	</span>
</button>

<style>
	.stempel {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		min-width: 0;
		padding: 6px 0;
		border: var(--rand-veld) solid transparent;
		border-radius: var(--radius-veld);
		background: none;
		color: var(--kleur-blauw);
		font: inherit;
		cursor: pointer;
		transition:
			border-color var(--overgang),
			background-color var(--overgang);
	}

	.stempel:hover {
		background: var(--kleur-blauw-licht);
	}

	.gekozen {
		border-color: var(--kleur-lijn);
		background: var(--kleur-blauw-licht);
	}

	.cirkel {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border: 2px dashed var(--kleur-lijn);
		border-radius: 50%;
	}

	.volgende .cirkel {
		border-color: var(--kleur-groen-donker);
		background: var(--kleur-groen-licht);
	}

	.verzameld .cirkel {
		border-style: solid;
		border-color: var(--kleur-groen-donker);
	}

	.slot {
		position: absolute;
		right: -4px;
		bottom: -4px;
		display: flex;
		padding: 2px;
		border-radius: 50%;
		background: var(--kleur-blauw-licht);
	}

	.naam {
		max-width: 100%;
		overflow: hidden;
		font-size: 11px;
		font-weight: 700;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.status {
		color: var(--kleur-grijs);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 9px;
		letter-spacing: 0.9px;
		text-transform: uppercase;
	}

	.volgende .status {
		color: var(--kleur-groen-donker);
	}
</style>
