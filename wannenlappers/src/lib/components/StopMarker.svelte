<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import { KAART, type Stop } from '#lib/data/stops.js';
	import type { StopStatus } from '#lib/state/tocht.svelte.js';

	interface Props {
		stop: Stop;
		status: StopStatus;
		/** Link naar de opdracht; enkel bij de volgende stop. */
		href?: string;
	}

	let { stop, status, href }: Props = $props();

	const statusTekst: Record<StopStatus, string> = {
		verzameld: 'gestempeld',
		volgende: 'volgende stop',
		open: 'nog te doen'
	};
</script>

{#snippet inhoud()}
	<span class="visueel-verborgen">Stop {stop.nr}, {stop.naam}: {statusTekst[status]}</span>
	{#if status === 'verzameld'}
		<Icoon naam="vinkje" maat={20} />
	{:else}
		<Icoon naam={stop.icoon} maat={status === 'volgende' ? 26 : 20} />
	{/if}
{/snippet}

<li
	class={['marker', status]}
	style:left="{(stop.x / KAART.breedte) * 100}%"
	style:top="{(stop.y / KAART.hoogte) * 100}%"
>
	{#if href}
		<a class="rond" {href}>{@render inhoud()}</a>
	{:else}
		<span class="rond">{@render inhoud()}</span>
	{/if}
</li>

<style>
	.marker {
		position: absolute;
		translate: -50% -50%;
	}

	.rond {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--kleur-wit);
		color: var(--kleur-inkt);
		box-shadow: 0 4px 10px var(--kleur-schaduw-marker);
		text-decoration: none;
	}

	.volgende .rond {
		width: 56px;
		height: 56px;
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	.verzameld .rond {
		background: var(--kleur-groen-donker);
		color: var(--kleur-wit);
	}

	a.rond {
		transition: filter var(--overgang);
	}

	a.rond:hover {
		filter: brightness(1.15);
	}
</style>
