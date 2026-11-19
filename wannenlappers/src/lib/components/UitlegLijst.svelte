<script lang="ts" module>
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	export interface Uitleg {
		icoon: IcoonNaam;
		tekst: string;
	}
</script>

<script lang="ts">
	import IcoonKnop from '#lib/components/IcoonKnop.svelte';

	interface Props {
		titel: string;
		stappen: Uitleg[];
	}

	let { titel, stappen }: Props = $props();

	const id = $props.id();
</script>

<!-- Wit kaartje (Figma v5), met de iconen in canvas-cirkels zoals de tegels op Onderweg. -->
<section class="uitleg" aria-labelledby="{id}-titel">
	<h2 id="{id}-titel">{titel}</h2>
	<ol>
		{#each stappen as stap (stap.tekst)}
			<li>
				<IcoonKnop icoon={stap.icoon} label="" maat={40} icoonMaat={20} kleur="canvas" />
				<span>{stap.tekst}</span>
			</li>
		{/each}
	</ol>
</section>

<style>
	.uitleg {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px;
		border-radius: 28px;
		background: var(--kleur-wit);
	}

	h2 {
		font-weight: 500;
		font-size: 17px;
		line-height: 1.35;
	}

	ol {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		gap: 14px;
		font-size: 16px;
		line-height: 1.35;
	}
</style>
