<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icoon from '#lib/components/Icoon.svelte';
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	interface Props {
		titel: string;
		kleur?: 'blauw' | 'groen';
		icoon?: IcoonNaam;
		/** Extra inhoud rechts in de tab, bv. een duur. */
		extra?: Snippet;
		children: Snippet;
	}

	let { titel, kleur = 'blauw', icoon, extra, children }: Props = $props();

	const id = $props.id();
</script>

<section class="vak {kleur}" aria-labelledby="{id}-titel">
	<div class="tab">
		{#if icoon}
			<Icoon naam={icoon} />
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
		--vak-kleur: var(--kleur-blauw);
		width: 100%;
	}

	.groen {
		--vak-kleur: var(--kleur-groen-donker);
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		border-radius: var(--radius-klein) var(--radius-klein) 0 0;
		background: var(--vak-kleur);
		color: var(--kleur-wit);
		font-size: 14px;
	}

	h2 {
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 14px;
	}

	.extra {
		margin-left: auto;
		font-weight: 700;
	}

	.inhoud {
		padding: 14px;
		border: 1.5px solid var(--kleur-lijn);
		border-top: none;
		border-radius: 0 0 var(--radius-klein) var(--radius-klein);
		background: var(--kleur-wit);
	}
</style>
