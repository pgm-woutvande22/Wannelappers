<script lang="ts">
	import wannesLaps from '#lib/assets/wannes-laps.svg';
	import Chip from '#lib/components/Chip.svelte';
	import Lint from '#lib/components/Lint.svelte';

	interface Props {
		lint: string;
		titel: string;
		beschrijving: string;
		kenmerken?: string[];
	}

	let { lint, titel, beschrijving, kenmerken = [] }: Props = $props();
</script>

<header class="kop">
	<Lint tekst={lint} />
	<div class="titelrij">
		<h1>{titel}</h1>
		<img src={wannesLaps} alt="Wannes Laps" width="76" height="76" />
	</div>
	<p>{beschrijving}</p>
	{#if kenmerken.length}
		<ul class="kenmerken">
			{#each kenmerken as kenmerk (kenmerk)}
				<li><Chip>{kenmerk}</Chip></li>
			{/each}
		</ul>
	{/if}
</header>

<style>
	/* Volle breedte, tot boven in het scherm (ook onder de statusbalk van de telefoon). */
	.kop {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		padding: calc(env(safe-area-inset-top) + 28px) var(--ruimte-scherm) 28px;
		border-radius: 0 0 var(--radius-groot) var(--radius-groot);
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	.titelrij {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		width: 100%;
	}

	h1 {
		flex: 1;
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 36px;
		line-height: 1.05;
	}

	img {
		flex-shrink: 0;
	}

	p {
		font-size: 17px;
		line-height: 1.3;
	}

	.kenmerken {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 0;
		list-style: none;
	}
</style>
