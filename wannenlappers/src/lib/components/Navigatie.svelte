<script lang="ts" module>
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	export interface NavItem {
		label: string;
		icoon: IcoonNaam;
		/** Zonder href: nog niet beschikbaar. */
		href?: string;
	}
</script>

<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';

	interface Props {
		items: NavItem[];
		/** href van het actieve item. */
		actief: string;
	}

	let { items, actief }: Props = $props();
</script>

<!-- Figma v5 "Navigatie": zwevende witte pil; het actieve item is een blauwe pil met label. -->
<nav class="navigatie" aria-label="Hoofdmenu">
	{#each items as item (item.label)}
		{@const isActief = item.href === actief}
		{#if item.href}
			<a
				class={['item', { actief: isActief }]}
				href={item.href}
				aria-current={isActief ? 'page' : undefined}
				aria-label={isActief ? undefined : item.label}
			>
				<Icoon naam={item.icoon} maat={24} />
				{#if isActief}<span>{item.label}</span>{/if}
			</a>
		{:else}
			<span class="item niet-beschikbaar" aria-disabled="true" title="{item.label}: binnenkort">
				<Icoon naam={item.icoon} maat={24} />
				<span class="visueel-verborgen">{item.label} (binnenkort)</span>
			</span>
		{/if}
	{/each}
</nav>

<style>
	.navigatie {
		display: flex;
		align-items: center;
		gap: 4px;
		height: 72px;
		padding: 0 8px;
		border-radius: 36px;
		background: var(--kleur-wit);
		filter: drop-shadow(0 8px 12px var(--kleur-schaduw));
	}

	.item {
		display: flex;
		flex: 1 0 0;
		align-items: center;
		justify-content: center;
		gap: 8px;
		min-width: 0;
		height: 56px;
		border-radius: 28px;
		color: var(--kleur-inkt);
		font-family: var(--font-basis);
		font-weight: 500;
		font-size: 16px;
		line-height: 1.35;
		text-decoration: none;
		transition: background-color var(--overgang);
	}

	a.item:not(.actief):hover {
		background: var(--kleur-canvas);
	}

	.actief {
		flex: 0 0 auto;
		padding: 0 20px 0 18px;
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	.niet-beschikbaar {
		opacity: 0.4;
	}
</style>
