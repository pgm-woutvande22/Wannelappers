<script lang="ts">
	interface Props {
		/** Klein grijs label boven de titel, bv. "Voor we starten". */
		label?: string;
		titel: string;
		intro?: string;
	}

	let { label, titel, intro }: Props = $props();
</script>

<!-- Zoals de koppen in Figma v5 (Kaart, Stempels): grote titel, grijze uitleg. -->
<header class="kop">
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
	}

	.label {
		margin-bottom: 4px;
		color: var(--kleur-subtiel);
		font-size: 14px;
		line-height: 1.35;
	}

	h1 {
		font-weight: 500;
		font-size: 32px;
		line-height: 1.12;
		letter-spacing: -0.64px;
	}

	.intro {
		margin-top: 8px;
		color: var(--kleur-subtiel);
		font-size: 16px;
		line-height: 1.35;
	}
</style>
