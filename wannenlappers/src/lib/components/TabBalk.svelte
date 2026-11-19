<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	export interface Tab {
		label: string;
		icoon: IcoonNaam;
		/** Zonder href: nog niet beschikbaar. */
		href?: string;
	}

	interface Props {
		tabs: Tab[];
		/** href van de actieve tab. */
		actief: string;
	}

	let { tabs, actief }: Props = $props();
</script>

<nav class="tabbalk" aria-label="Hoofdmenu">
	{#each tabs as tab (tab.label)}
		{@const isActief = tab.href === actief}
		{#if tab.href}
			<a class={['tab', { actief: isActief }]} href={tab.href} aria-current={isActief ? 'page' : undefined}>
				<span class="pil"><Icoon naam={tab.icoon} maat={24} /></span>
				{tab.label}
			</a>
		{:else}
			<span class="tab niet-beschikbaar" aria-disabled="true" title="Binnenkort">
				<span class="pil"><Icoon naam={tab.icoon} maat={24} /></span>
				{tab.label}
			</span>
		{/if}
	{/each}
</nav>

<style>
	.tabbalk {
		position: sticky;
		bottom: 0;
		display: flex;
		align-items: center;
		height: calc(var(--tabbalk-hoogte) + env(safe-area-inset-bottom) + 8px);
		padding: 8px 16px calc(env(safe-area-inset-bottom) + 8px);
		border-top: 1.5px solid var(--kleur-lijn);
		background: var(--kleur-wit);
	}

	.tab {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		gap: 3px;
		min-width: 0;
		color: var(--kleur-grijs);
		font-family: var(--font-titel);
		font-weight: 700;
		font-size: 12px;
		text-decoration: none;
	}

	.pil {
		display: flex;
		padding: 4px 18px;
		border-radius: var(--radius-pil);
		transition: background-color var(--overgang);
	}

	a.tab:hover .pil {
		background: var(--kleur-blauw-licht);
	}

	.actief {
		color: var(--kleur-blauw);
		font-weight: 800;
	}

	.actief .pil {
		background: var(--kleur-blauw-licht);
	}

	.niet-beschikbaar {
		opacity: 0.5;
	}
</style>
