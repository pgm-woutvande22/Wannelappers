<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		titel: string;
		onderschrift?: string;
		/** Links van de tekst, bv. een icoon in een cirkel. */
		voor?: Snippet;
		/** Rechts van de tekst, bv. een knop. */
		na?: Snippet;
		/** Kleinere opvulling en titel. */
		compact?: boolean;
	}

	let { titel, onderschrift, voor, na, compact = false }: Props = $props();
</script>

<div class={['info', { compact }]}>
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
		gap: 14px;
		padding: 16px;
		border-radius: var(--radius-kaart);
		background: var(--kleur-groen-licht);
	}

	.compact {
		gap: 12px;
		padding: 12px;
		border-radius: var(--radius-knop);
	}

	.tekst {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.titel {
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 17px;
	}

	.compact .titel {
		font-weight: 900;
	}

	.onderschrift {
		color: var(--kleur-grijs);
		font-size: 15px;
	}
</style>
