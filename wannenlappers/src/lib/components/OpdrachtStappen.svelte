<script lang="ts">
	interface Props {
		stappen: string[];
	}

	let { stappen }: Props = $props();
</script>

<ol class="stappen">
	{#each stappen as stap, i (i)}
		<li>
			<span class="nr" aria-hidden="true">{i + 1}</span>
			<span class="tekst">{stap}</span>
		</li>
	{/each}
</ol>

<style>
	.stappen {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	/* Zelfde bolletjes als in de stopbalk van Onderweg (40px, groen). */
	.nr {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--kleur-groen-donker);
		color: var(--kleur-wit);
		font-family: var(--font-basis);
		font-weight: 600;
		font-size: 16px;
	}

	.tekst {
		padding-top: 4px;
		color: var(--kleur-inkt);
		font-family: var(--font-basis);
		font-weight: 500;
		font-size: 18px;
		line-height: 1.3;
	}
</style>
