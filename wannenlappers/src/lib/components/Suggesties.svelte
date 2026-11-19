<script lang="ts">
	interface Props {
		suggesties: string[];
		/** Huidige waarde; de overeenkomende suggestie wordt als gekozen getoond. */
		gekozen?: string;
		onkies: (suggestie: string) => void;
	}

	let { suggesties, gekozen, onkies }: Props = $props();
</script>

<div class="suggesties" role="group" aria-label="Ideetjes voor een teamnaam">
	<span class="label" aria-hidden="true">Ideetje:</span>
	{#each suggesties as suggestie (suggestie)}
		<button type="button" aria-pressed={gekozen === suggestie} onclick={() => onkies(suggestie)}>
			{suggestie}
		</button>
	{/each}
</div>

<style>
	.suggesties {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		line-height: 1.35;
	}

	.label {
		color: var(--kleur-subtiel);
	}

	/* Witte pilletjes zoals de Chip uit Figma v5; gekozen = blauw zoals de navigatie. */
	button {
		min-height: var(--tik-min);
		padding: 0 14px;
		border: none;
		border-radius: 99px;
		background: var(--kleur-wit);
		color: var(--kleur-inkt);
		font-family: var(--font-basis);
		font-weight: 500;
		font-size: 14px;
		cursor: pointer;
		transition:
			background-color var(--overgang),
			transform var(--overgang);
	}

	button:hover {
		background: var(--kleur-blauwtint);
	}

	button:active {
		transform: scale(0.96);
	}

	button[aria-pressed='true'] {
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}
</style>
