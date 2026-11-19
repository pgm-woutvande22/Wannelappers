<script lang="ts">
	import Lint from '#lib/components/Lint.svelte';

	interface Props {
		lint?: string;
		titel: string;
		intro?: string;
	}

	let { lint, titel, intro }: Props = $props();
</script>

<header class="kop">
	{#if lint}
		<Lint tekst={lint} variant="klein" />
	{/if}
	<h1>{titel}</h1>
	{#if intro}
		<p>{intro}</p>
	{/if}
</header>

<style>
	.kop {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		text-align: center;
	}

	h1 {
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 30px;
		line-height: 1.1;
	}

	p {
		color: var(--kleur-grijs);
		line-height: 1.3;
	}
</style>
