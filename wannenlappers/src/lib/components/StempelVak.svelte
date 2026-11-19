<script lang="ts">
	import cirkelLeeg from '#lib/assets/cirkel-leeg.svg';
	import cirkelVolgende from '#lib/assets/cirkel-volgende.svg';
	import Icoon from '#lib/components/Icoon.svelte';
	import Vak from '#lib/components/Vak.svelte';
	import type { Stop } from '#lib/data/stops.js';
	import type { StopStatus } from '#lib/state/tocht.svelte.js';

	interface Props {
		stop: Stop;
		status: StopStatus;
	}

	let { stop, status }: Props = $props();

	const kleur = $derived(
		status === 'verzameld' ? 'blauw' : status === 'volgende' ? 'groen' : 'licht'
	);
</script>

<Vak titel="#{stop.nr} {stop.naam}" {kleur} compact gecentreerd>
	{#snippet extra()}
		{#if status === 'volgende'}Volgende{/if}
	{/snippet}

	{#if status === 'verzameld'}
		<span class="inkt" role="img" aria-label="Gestempeld">
			{#if stop.inktstempel}
				<img src={stop.inktstempel} alt="" width="84" height="84" />
			{:else}
				<span class="ring"><Icoon naam={stop.icoon} maat={30} /></span>
			{/if}
			<span class="inkt-tekst boven">Stop {stop.nr}</span>
			<span class="inkt-tekst onder">{stop.naam}</span>
		</span>
	{:else}
		<span class={['leeg', status]} role="img" aria-label={status === 'volgende' ? 'Volgende stempel' : 'Nog geen stempel'}>
			<img src={status === 'volgende' ? cirkelVolgende : cirkelLeeg} alt="" width="80" height="80" />
			<Icoon naam={stop.icoon} maat={30} />
		</span>
	{/if}
</Vak>

<style>
	.inkt,
	.leeg {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 96px;
		height: 96px;
	}

	.leeg {
		width: 92px;
		height: 92px;
		color: var(--kleur-lijn);
	}

	.leeg.volgende {
		color: var(--kleur-groen-donker);
	}

	.leeg img {
		position: absolute;
		inset: 6px;
	}

	.leeg :global(.icoon) {
		position: relative;
	}

	/* Inktstempel licht gedraaid, zoals een echte stempel. */
	.inkt {
		rotate: 8deg;
		color: var(--kleur-blauw);
	}

	.inkt img,
	.ring {
		position: absolute;
		inset: 6px;
		width: 84px;
		height: 84px;
	}

	.ring {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px double var(--kleur-blauw);
		border-radius: 50%;
		opacity: 0.9;
	}

	.inkt-tekst {
		position: absolute;
		left: 50%;
		translate: -50% 0;
		font-family: var(--font-titel);
		font-weight: 900;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.boven {
		top: 19px;
		font-size: 7.2px;
		letter-spacing: 1px;
	}

	.onder {
		top: 61px;
		font-size: 6.2px;
		letter-spacing: 0.87px;
	}
</style>
