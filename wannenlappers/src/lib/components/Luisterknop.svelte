<script lang="ts">
	import Icoon from '#lib/components/Icoon.svelte';

	interface Props {
		label?: string;
		/** Toegankelijk label als de zichtbare tekst te kort is, bv. "Luister naar het bericht van Wannes". */
		uitleg?: string;
		onclick?: () => void;
	}

	let { label = 'Luister', uitleg, onclick }: Props = $props();
</script>

<button class="luister" type="button" aria-label={uitleg} {onclick}>
	<Icoon naam="speaker" maat={22} />
	{label}
</button>

<style>
	.luister {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		gap: 8px;
		min-height: 44px;
		padding: 0 18px 0 14px;
		border: none;
		border-radius: var(--radius-pil);
		background: var(--kleur-groen-donker);
		color: var(--kleur-wit);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 16px;
		cursor: pointer;
		transition:
			filter var(--overgang),
			transform var(--overgang);
	}

	.luister:hover {
		filter: brightness(1.15);
	}

	.luister:active {
		transform: scale(0.97);
	}
</style>
