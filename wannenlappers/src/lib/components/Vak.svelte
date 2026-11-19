<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icoon from '#lib/components/Icoon.svelte';
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	interface Props {
		titel: string;
		/** blauw / groen: witte tekst op kleur; licht: blauwe tekst op lichtblauw. */
		kleur?: 'blauw' | 'groen' | 'licht';
		icoon?: IcoonNaam;
		/** Kleinere tab en minder opvulling, voor vakken naast elkaar. */
		compact?: boolean;
		/** Inhoud horizontaal centreren. */
		gecentreerd?: boolean;
		/** Extra inhoud rechts in de tab, bv. een duur of status. */
		extra?: Snippet;
		children: Snippet;
	}

	let {
		titel,
		kleur = 'blauw',
		icoon,
		compact = false,
		gecentreerd = false,
		extra,
		children
	}: Props = $props();

	const id = $props.id();
</script>

<section class={['vak', kleur, { compact, gecentreerd }]} aria-labelledby="{id}-titel">
	<div class="tab">
		{#if icoon}
			<Icoon naam={icoon} maat={compact ? 15 : 16} />
		{/if}
		<h2 id="{id}-titel">{titel}</h2>
		{#if extra}
			<span class="extra">{@render extra()}</span>
		{/if}
	</div>
	<div class="inhoud">
		{@render children()}
	</div>
</section>

<style>
	.vak {
		--tab-achtergrond: var(--kleur-blauw);
		--tab-tekst: var(--kleur-wit);
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 0;
	}

	.groen {
		--tab-achtergrond: var(--kleur-groen-donker);
	}

	.licht {
		--tab-achtergrond: var(--kleur-blauw-licht);
		--tab-tekst: var(--kleur-blauw);
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		border-radius: var(--radius-veld) var(--radius-veld) 0 0;
		background: var(--tab-achtergrond);
		color: var(--tab-tekst);
		font-size: 14px;
	}

	.compact .tab {
		padding: 7px 12px;
		font-size: 13px;
	}

	h2 {
		overflow: hidden;
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: inherit;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.extra {
		margin-left: auto;
		font-weight: 700;
		white-space: nowrap;
	}

	.inhoud {
		flex: 1;
		padding: 14px;
		border: 1.5px solid var(--kleur-lijn);
		border-top: none;
		border-radius: 0 0 var(--radius-veld) var(--radius-veld);
		background: var(--kleur-wit);
	}

	.compact .inhoud {
		padding: 10px 12px;
	}

	.gecentreerd .inhoud {
		display: flex;
		justify-content: center;
	}
</style>
