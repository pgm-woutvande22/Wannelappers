<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	export interface Uitleg {
		icoon: IcoonNaam;
		tekst: string;
	}

	interface Props {
		titel: string;
		stappen: Uitleg[];
	}

	let { titel, stappen }: Props = $props();

	const id = $props.id();
</script>

<section class="uitleg" aria-labelledby="{id}-titel">
	<h2 id="{id}-titel">{titel}</h2>
	<ol>
		{#each stappen as stap (stap.tekst)}
			<li>
				<span class="cirkel"><Icoon naam={stap.icoon} maat={22} /></span>
				{stap.tekst}
			</li>
		{/each}
	</ol>
</section>

<style>
	.uitleg {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	h2 {
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 20px;
	}

	ol {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		gap: 14px;
		font-size: 17px;
		line-height: 1.25;
	}

	.cirkel {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--kleur-blauw-licht);
	}
</style>
