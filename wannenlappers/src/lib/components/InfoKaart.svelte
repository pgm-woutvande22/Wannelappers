<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		titel: string;
		onderschrift?: string;
		/** Links van de tekst, bv. een icoon in een cirkel. */
		voor?: Snippet;
		/** Rechts van de tekst, bv. een knop. */
		na?: Snippet;
	}

	let { titel, onderschrift, voor, na }: Props = $props();
</script>

<!-- Wit kaartje in de stijl van Figma v5 (zoals "Volgende stop" op de kaart). -->
<div class="info">
	{#if voor}{@render voor()}{/if}
	<div class="tekst">
		<p class="titel">{titel}</p>
		{#if onderschrift}
			<p class="onderschrift">{onderschrift}</p>
		{/if}
	</div>
	{#if na}{@render na()}{/if}
</div>

<style>
	.info {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 12px 12px 18px;
		border-radius: 24px;
		background: var(--kleur-wit);
	}

	.tekst {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
		line-height: 1.35;
	}

	.titel {
		font-weight: 500;
		font-size: 17px;
	}

	.onderschrift {
		color: var(--kleur-subtiel);
		font-size: 14px;
	}
</style>
