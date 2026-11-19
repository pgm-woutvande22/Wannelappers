<script lang="ts">
	import IcoonKnop from '#lib/components/IcoonKnop.svelte';

	interface Props {
		titel: string;
		terugHref: string;
		/** Zonder: geen hulpknop (bv. geen hint ingesteld). */
		onhulp?: () => void;
		hulpOpen?: boolean;
	}

	let { titel, terugHref, onhulp, hulpOpen = false }: Props = $props();
</script>

<!-- Figma v5 "Top": terug, titel in het midden, hulp. -->
<header class="top">
	<IcoonKnop icoon="terug" label="Terug" href={terugHref} />
	<h1>{titel}</h1>
	{#if onhulp}
		<IcoonKnop
			icoon="hulp"
			label={hulpOpen ? 'Verberg de hint' : 'Toon een hint'}
			ingedrukt={hulpOpen}
			onclick={onhulp}
		/>
	{:else}
		<span class="plek" aria-hidden="true"></span>
	{/if}
</header>

<style>
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	h1 {
		font-weight: 500;
		font-size: 16px;
		line-height: 1.35;
		white-space: nowrap;
	}

	.plek {
		width: 48px;
	}
</style>
