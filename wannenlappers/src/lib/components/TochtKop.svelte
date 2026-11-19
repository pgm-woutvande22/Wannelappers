<script lang="ts">
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
	.kop {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 20px;
		text-align: center;
		border-radius: var(--radius-groot);
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	.titelrij {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		width: 100%;
	}

	h1 {
		flex: 1;
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 32px;
		line-height: 1.05;
	}

	img {
		flex-shrink: 0;
	}

	p {
		line-height: 1.3;
	}

	.kenmerken {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px;
		padding: 0;
		list-style: none;
	}
</style>
