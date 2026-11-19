<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import { KAART, type Stop } from '#lib/data/stops.js';

	interface Props {
		stop: Stop;
		volgende?: boolean;
		gekozen?: boolean;
		onkies: () => void;
	}

	let { stop, volgende = false, gekozen = false, onkies }: Props = $props();

	const icoon = $derived(volgende && stop.kaartIcoonVolgende ? stop.kaartIcoonVolgende : stop.kaartIcoon);
	const label = $derived(`Stop ${stop.nr}: ${stop.naam}${volgende ? ' (volgende)' : ''}`);
</script>

<button
	type="button"
	class={['marker', { volgende, gekozen, kist: !stop.stempel }]}
	style:left="{(stop.x / KAART.breedte) * 100}%"
	style:top="{(stop.y / KAART.hoogte) * 100}%"
	aria-label={label}
	aria-pressed={gekozen}
	onclick={onkies}
>
	<Icoon naam={icoon} />
	<span class="nr" aria-hidden="true">{stop.nr}</span>
</button>

<style>
	.marker {
		--maat: 42px;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--maat);
		height: var(--maat);
		padding: 0;
		border: 2.5px solid var(--kleur-groen-donker);
		border-radius: 50%;
		background: var(--kleur-wit);
		cursor: pointer;
		translate: -50% -50%;
		transition:
			scale var(--overgang),
			box-shadow var(--overgang);
	}

	.kist {
		border-color: var(--kleur-blauw);
	}

	.volgende {
		--maat: 54px;
		border: 4px solid var(--kleur-wit);
		background: var(--kleur-groen-donker);
	}

	.marker:hover,
	.gekozen {
		scale: 1.08;
		box-shadow: 0 0 0 4px var(--kleur-groen-licht);
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
		top: -8px;
		right: -8px;
	}
</style>
