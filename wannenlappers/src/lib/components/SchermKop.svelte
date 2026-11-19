<script lang="ts">
	interface Props {
		/** Klein groen label boven de titel. */
		label?: string;
		titel: string;
		intro?: string;
		/** Kleinere titel, voor schermen met voortgangsbalk. */
		klein?: boolean;
	}

	let { label, titel, intro, klein = false }: Props = $props();
</script>

<header class={['kop', { klein }]}>
	{#if label}
		<p class="label">{label}</p>
	{/if}
	<h1>{titel}</h1>
	{#if intro}
		<p class="intro">{intro}</p>
	{/if}
</header>

<style>
	.kop {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.label {
		color: var(--kleur-groen-donker);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 12px;
		letter-spacing: 1.68px;
		text-transform: uppercase;
	}

	h1 {
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 32px;
		line-height: 1.1;
	}

	.klein h1 {
		font-size: 24px;
		line-height: 1.15;
	}

	.intro {
		color: var(--kleur-grijs);
		font-size: 17px;
		line-height: 1.3;
	}
</style>
