<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';

	interface Props {
		tekst: string;
		/** Voortgang tussen 0 en 1. */
		voortgang?: number;
		onplay?: () => void;
	}

	let { tekst, voortgang = 0, onplay }: Props = $props();
</script>

<div class="bericht">
	<button class="speel" type="button" aria-label="Bericht afspelen" onclick={onplay}>
		<Icoon naam="play" />
	</button>
	<div class="tekst">
		<p>{tekst}</p>
		<progress max="1" value={voortgang} aria-label="Voortgang bericht"></progress>
	</div>
</div>

<style>
	.bericht {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.speel {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 60px;
		height: 60px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: var(--kleur-groen-donker);
		cursor: pointer;
	}

	.tekst {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 8px;
		line-height: 1.3;
	}

	progress {
		appearance: none;
		width: 100%;
		height: 6px;
		border: none;
		border-radius: 3px;
		background: var(--kleur-lijn);
		overflow: hidden;
	}

	progress::-webkit-progress-bar {
		background: var(--kleur-lijn);
	}

	progress::-webkit-progress-value {
		background: var(--kleur-groen-donker);
	}

	progress::-moz-progress-bar {
		background: var(--kleur-groen-donker);
	}
</style>
