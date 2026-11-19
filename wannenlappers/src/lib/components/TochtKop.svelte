<script lang="ts">
	import wannesLaps from '#lib/assets/wannes-laps.svg';
	import Chip from '#lib/components/Chip.svelte';

	interface Props {
		/** Pilletje in het illustratievlak, bv. "Stempeltocht". */
		soort: string;
		plaats: string;
		titel: string;
		beschrijving: string;
		kenmerken?: string[];
	}

	let { soort, plaats, titel, beschrijving, kenmerken = [] }: Props = $props();
</script>

<!-- In de stijl van Figma v5: titel bovenaan, groen illustratievlak met chip (zoals de opdracht). -->
<header class="kop">
	<p class="plaats">{plaats}</p>
	<h1>{titel}</h1>

	<div class="illustratie">
		<img src={wannesLaps} alt="Wannes Laps, de wannenlapper" width="150" height="150" />
		<span class="chip"><Chip variant="wit" icoon="stempel">{soort}</Chip></span>
	</div>

	<p class="beschrijving">{beschrijving}</p>

	{#if kenmerken.length}
		<ul class="kenmerken" aria-label="Over de tocht">
			{#each kenmerken as kenmerk (kenmerk)}
				<li><Chip variant="wit">{kenmerk}</Chip></li>
			{/each}
		</ul>
	{/if}
</header>

<style>
	.kop {
		display: flex;
		flex-direction: column;
	}

	.plaats {
		color: var(--kleur-subtiel);
		font-size: 14px;
		line-height: 1.35;
	}

	h1 {
		margin-top: 4px;
		font-weight: 500;
		font-size: 32px;
		line-height: 1.12;
		letter-spacing: -0.64px;
	}

	.illustratie {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 220px;
		margin-top: 18px;
		border-radius: 32px;
		background: var(--kleur-groentint);
	}

	.chip {
		position: absolute;
		top: 16px;
		left: 16px;
	}

	.beschrijving {
		margin-top: 18px;
		color: var(--kleur-subtiel);
		font-size: 17px;
		line-height: 1.35;
	}

	.kenmerken {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 14px;
		padding: 0;
		list-style: none;
	}
</style>
