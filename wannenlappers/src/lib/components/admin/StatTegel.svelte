<script lang="ts">
	interface Props {
		label: string;
		waarde: string;
		onderschrift?: string;
	}

	let { label, waarde, onderschrift }: Props = $props();
</script>

<div class="tegel">
	<dt>{label}</dt>
	<dd>
		<span class="waarde">{waarde}</span>
		{#if onderschrift}<span class="onderschrift">{onderschrift}</span>{/if}
	</dd>
</div>

<style>
	.tegel {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 20px;
		border: 1px solid var(--kleur-lijn);
		border-radius: var(--radius-kaart);
		background: var(--kleur-wit);
	}

	dt {
		color: var(--kleur-grijs);
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	dd {
		display: flex;
		flex-direction: column;
		margin: 0;
	}

	.waarde {
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 32px;
		font-variant-numeric: tabular-nums;
	}

	.onderschrift {
		color: var(--kleur-grijs);
		font-size: 13px;
	}
</style>
