<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import Stempel from '#lib/components/Stempel.svelte';
	import type { Stop } from '#lib/data/stops.js';
	import type { StopStatus } from '#lib/state/tocht.svelte.js';

	interface Props {
		stop: Stop;
		status: StopStatus;
	}

	let { stop, status }: Props = $props();

	/** "120 m · ± 3 min" -> "120 m" */
	const meters = $derived(stop.afstand?.split('·')[0].trim());
	const onderschrift = $derived(
		status === 'verzameld'
			? 'Gestempeld'
			: status === 'volgende'
				? meters
					? `Volgende · ${meters}`
					: 'Volgende'
				: `Stop ${stop.nr}`
	);
</script>

<!-- Figma v5 "Stempel · …": wit kaartje met vlak (stempel of lege ring) en naam. -->
<article class="vak">
	<div class={['vlak', status]}>
		{#if status === 'verzameld'}
			<Stempel {stop} maat={104} draai={-8} />
		{:else}
			<span class="ring"><Icoon naam={stop.icoon} maat={24} /></span>
		{/if}
	</div>
	<div class="tekst">
		<h2>{stop.naam}</h2>
		<p class={status}>{onderschrift}</p>
	</div>
</article>

<style>
	.vak {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 12px;
		min-width: 0;
		padding: 16px;
		border-radius: 28px;
		background: var(--kleur-wit);
	}

	.vlak {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 120px;
		border-radius: 22px;
		background: var(--kleur-canvas);
	}

	.vlak.verzameld {
		background: none;
	}

	.ring {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 84px;
		height: 84px;
		border: 2px dashed currentColor;
		border-radius: 50%;
		color: var(--kleur-subtiel);
		opacity: 0.6;
	}

	.volgende .ring {
		color: var(--kleur-groen-donker);
		opacity: 1;
	}

	.tekst {
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-family: var(--font-basis);
		line-height: 1.35;
	}

	h2 {
		color: var(--kleur-inkt);
		font-weight: 500;
		font-size: 16px;
	}

	p {
		color: var(--kleur-subtiel);
		font-size: 14px;
	}

	p.verzameld {
		color: var(--kleur-groen-donker);
	}
</style>
