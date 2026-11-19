<script lang="ts">
	interface Props {
		stappen: string[];
	}

	let { stappen }: Props = $props();
</script>

<ol class="stappen">
	{#each stappen as stap, i (i)}
		<li>
			<span class="nummer" aria-hidden="true">{i + 1}</span>
			<span>{stap}</span>
		</li>
	{/each}
</ol>

<style>
	.stappen {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		gap: 10px;
		line-height: 1.25;
	}

	.nummer {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: var(--kleur-groen-licht);
		color: var(--kleur-groen-donker);
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 15px;
	}
</style>
