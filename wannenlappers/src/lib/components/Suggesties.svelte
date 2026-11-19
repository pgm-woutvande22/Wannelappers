<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';

	interface Props {
		suggesties: string[];
		/** Huidige waarde; de overeenkomende suggestie wordt als gekozen getoond. */
		gekozen?: string;
		onkies: (suggestie: string) => void;
	}

	let { suggesties, gekozen, onkies }: Props = $props();
</script>

<div class="suggesties" role="group" aria-label="Ideetjes voor een teamnaam">
	<span class="label">
		<Icoon naam="dobbelsteen" />
		Ideetje:
	</span>
	{#each suggesties as suggestie (suggestie)}
		<button
			type="button"
			aria-pressed={gekozen === suggestie}
			onclick={() => onkies(suggestie)}
		>
			{suggestie}
		</button>
	{/each}
</div>

<style>
	.suggesties {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		font-weight: 700;
	}

	.label {
		display: flex;
		align-items: center;
		gap: 4px;
		color: var(--kleur-grijs);
	}

	button {
		min-height: var(--tik-min);
		padding: 0 12px;
		border: var(--rand-veld) solid transparent;
		border-radius: var(--radius-pil);
		background: var(--kleur-blauw-licht);
		color: var(--kleur-blauw);
		font: inherit;
		cursor: pointer;
		transition:
			border-color var(--overgang),
			background-color var(--overgang),
			transform var(--overgang);
	}

	button:hover {
		border-color: var(--kleur-blauw);
	}

	button:active {
		transform: scale(0.96);
	}

	button[aria-pressed='true'] {
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}
</style>
