<script lang="ts" module>
	export interface Kind {
		/** Vaste sleutel voor de lijst, ook als er kinderen verwijderd worden. */
		id: number;
		leeftijd?: number;
	}

	export const MAX_KINDEREN = 10;
	/** Keuzes in de lijst; de tocht is voor 4–12 jaar, maar broertjes en zusjes lopen ook mee. */
	const LEEFTIJDEN = Array.from({ length: 16 }, (_, i) => i + 1);
</script>

<script lang="ts">
	import Foutmelding from '#lib/components/Foutmelding.svelte';

	interface Props {
		kinderen: Kind[];
		/** Naam van de selects in het formulier (één waarde per kind). */
		name: string;
		/** Foutboodschap; zet de kinderen zonder leeftijd in fouttoestand. */
		fout?: string;
		hulp?: string;
	}

	let { kinderen = $bindable(), name, fout, hulp }: Props = $props();

	const id = $props.id();
	const volgendId = $derived(Math.max(0, ...kinderen.map((k) => k.id)) + 1);

	function voegToe() {
		kinderen.push({ id: volgendId });
	}

	function verwijder(kind: Kind) {
		kinderen = kinderen.filter((k) => k !== kind);
	}
</script>

<fieldset aria-describedby="{id}-fout{hulp ? ` ${id}-hulp` : ''}">
	<legend class="veldlabel">Hoe oud zijn de kinderen?</legend>

	<ul>
		{#each kinderen as kind, i (kind.id)}
			{@const ongeldig = fout !== undefined && kind.leeftijd === undefined}
			<li class={['kind', { fout: ongeldig }]}>
				<label for="{id}-{kind.id}">Kind {i + 1}</label>
				<select
					id="{id}-{kind.id}"
					{name}
					aria-invalid={ongeldig ? true : undefined}
					aria-describedby="{id}-fout"
					bind:value={kind.leeftijd}
				>
					<option value={undefined} disabled>Kies</option>
					{#each LEEFTIJDEN as leeftijd (leeftijd)}
						<option value={leeftijd}>{leeftijd} jaar</option>
					{/each}
				</select>
				{#if kinderen.length > 1}
					<button
						class="verwijder"
						type="button"
						aria-label="Verwijder kind {i + 1}"
						onclick={() => verwijder(kind)}
					>
						✕
					</button>
				{/if}
			</li>
		{/each}
	</ul>

	{#if kinderen.length < MAX_KINDEREN}
		<button class="toevoegen" type="button" onclick={voegToe}>+ Nog een kind</button>
	{/if}

	<Foutmelding id="{id}-fout" tekst={fout} />
	{#if hulp}
		<p id="{id}-hulp" class="hulp">{hulp}</p>
	{/if}
</fieldset>

<style>
	fieldset {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin: 0;
		padding: 0;
		border: none;
	}

	/* Een legend telt niet mee in de flex-layout van de fieldset; daarom eigen marge. */
	legend {
		padding: 0;
		margin-bottom: 12px;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 0;
		list-style: none;
	}

	.kind {
		display: flex;
		align-items: center;
		gap: 12px;
		height: 60px;
		padding: 0 8px 0 16px;
		border: var(--rand-veld) solid var(--kleur-lijn);
		border-radius: var(--radius-veld);
		background: var(--kleur-wit);
		transition: border-color var(--overgang);
	}

	.kind:hover {
		border-color: var(--kleur-grijs);
	}

	.kind:focus-within {
		border-color: var(--kleur-blauw);
		outline: 3px solid var(--kleur-blauw-licht);
		outline-offset: 0;
	}

	.kind.fout {
		border-color: var(--kleur-fout);
		background: var(--kleur-fout-licht);
	}

	label {
		flex-shrink: 0;
		width: 56px;
		color: var(--kleur-grijs);
		font-size: 15px;
	}

	select {
		flex: 1;
		min-width: 0;
		height: 100%;
		padding: 0;
		border: none;
		background: none;
		color: var(--kleur-blauw);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 20px;
		cursor: pointer;
	}

	select:focus {
		outline: none;
	}

	.verwijder {
		display: grid;
		flex-shrink: 0;
		place-items: center;
		width: var(--tik-min);
		height: var(--tik-min);
		border: none;
		border-radius: var(--radius-pil);
		background: none;
		color: var(--kleur-grijs);
		font-size: 16px;
		cursor: pointer;
		transition: background-color var(--overgang);
	}

	.verwijder:hover {
		background: var(--kleur-blauw-licht);
		color: var(--kleur-blauw);
	}

	.toevoegen {
		align-self: flex-start;
		min-height: var(--tik-min);
		padding: 0 16px;
		border: 2px dashed var(--kleur-lijn);
		border-radius: var(--radius-pil);
		background: none;
		color: var(--kleur-blauw);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 15px;
		cursor: pointer;
		transition: border-color var(--overgang);
	}

	.toevoegen:hover {
		border-color: var(--kleur-blauw);
	}

	.hulp {
		color: var(--kleur-grijs);
		font-size: 14px;
		line-height: 1.25;
	}
</style>
