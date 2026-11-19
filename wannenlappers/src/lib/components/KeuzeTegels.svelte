<script lang="ts">
	import Foutmelding from '#lib/components/Foutmelding.svelte';

	export interface Keuze {
		waarde: string;
		label: string;
		onderschrift?: string;
	}

	interface Props {
		/** Vraag boven de tegels (wordt de legend van de fieldset). */
		vraag: string;
		name: string;
		keuzes: Keuze[];
		value?: string;
		/** Foutboodschap; zet de tegels in fouttoestand. */
		fout?: string;
	}

	let { vraag, name, keuzes, value = $bindable(), fout }: Props = $props();

	const id = $props.id();
</script>

<fieldset aria-describedby="{id}-fout" class={{ fout }}>
	<legend>{vraag}</legend>
	<div class="tegels">
		{#each keuzes as keuze (keuze.waarde)}
			<label class="tegel">
				<input
					type="radio"
					{name}
					value={keuze.waarde}
					data-ongeldig={fout ? true : undefined}
					bind:group={value}
				/>
				<span class="label">{keuze.label}</span>
				{#if keuze.onderschrift}
					<span class="onderschrift">{keuze.onderschrift}</span>
				{/if}
			</label>
		{/each}
	</div>
	<Foutmelding id="{id}-fout" tekst={fout} />
</fieldset>

<style>
	fieldset {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 0;
		padding: 0;
		border: none;
	}

	legend {
		float: left;
		width: 100%;
		padding: 0;
		margin-bottom: 10px;
	}

	.tegels {
		display: flex;
		gap: 8px;
	}

	.tegel {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 0;
		height: 60px;
		border: var(--rand-veld) solid var(--kleur-lijn);
		border-radius: var(--radius-veld);
		background: var(--kleur-wit);
		cursor: pointer;
		white-space: nowrap;
		transition:
			border-color var(--overgang),
			background-color var(--overgang),
			transform var(--overgang);
	}

	.tegel:hover {
		border-color: var(--kleur-grijs);
	}

	.tegel:active {
		transform: scale(0.97);
	}

	.fout .tegel {
		border-color: var(--kleur-fout);
		background: var(--kleur-fout-licht);
	}

	.tegel:has(input:checked) {
		border-color: var(--kleur-groen-donker);
		background: var(--kleur-groen-donker);
		color: var(--kleur-wit);
	}

	.tegel:has(input:focus-visible) {
		outline: 3px solid var(--kleur-groen-donker);
		outline-offset: 2px;
	}

	input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.label {
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 20px;
	}

	.onderschrift {
		color: var(--kleur-grijs);
		font-size: 13px;
	}

	.tegel:has(input:checked) .onderschrift {
		color: inherit;
	}
</style>
