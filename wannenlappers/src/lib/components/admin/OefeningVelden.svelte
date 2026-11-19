<script lang="ts">
	import AdminVeld from '#lib/components/admin/AdminVeld.svelte';
	import {
		MAX_HINT_TEKENS,
		MAX_INTRO_TEKENS,
		MAX_STAP_TEKENS,
		MAX_STAPPEN,
		type OefeningFouten,
		type OefeningInvoer
	} from '#lib/utils/oefeningFormulier.js';

	interface Props {
		waarden: OefeningInvoer;
		fouten?: OefeningFouten;
		stops: { nr: number; naam: string }[];
		/** Paden van de beschikbare audiobestanden. */
		audio: string[];
	}

	let { waarden, fouten = {}, stops, audio }: Props = $props();

	/** Een audiopad dat niet (meer) in de bucket staat, toch tonen zodat het niet verloren gaat. */
	const audioOpties = $derived(
		waarden.audio_pad && !audio.includes(waarden.audio_pad) ? [waarden.audio_pad, ...audio] : audio
	);
</script>

<div class="rij">
	<AdminVeld label="Stop" fout={fouten.stop_nr}>
		{#snippet children(attr)}
			<select {...attr} name="stop_nr" required>
				{#each stops as stop (stop.nr)}
					<option value={stop.nr} selected={stop.nr === waarden.stop_nr}>
						{stop.nr} · {stop.naam}
					</option>
				{/each}
			</select>
		{/snippet}
	</AdminVeld>

	<AdminVeld label="Volgorde" hulp="Lager nummer komt eerst." fout={fouten.volgorde}>
		{#snippet children(attr)}
			<input {...attr} name="volgorde" type="number" min="0" step="1" value={waarden.volgorde} />
		{/snippet}
	</AdminVeld>
</div>

<AdminVeld label="Titel" fout={fouten.titel}>
	{#snippet children(attr)}
		<input {...attr} name="titel" type="text" maxlength={120} required value={waarden.titel} />
	{/snippet}
</AdminVeld>

<AdminVeld
	label="Inleiding"
	hulp="Max. twee korte zinnen ({MAX_INTRO_TEKENS} tekens). Gezinnen lezen dit staand, buiten in de zon."
	fout={fouten.tekst}
>
	{#snippet children(attr)}
		<textarea {...attr} name="tekst" rows="3" maxlength={MAX_INTRO_TEKENS}>{waarden.tekst}</textarea
		>
	{/snippet}
</AdminVeld>

<AdminVeld
	label="Stappen"
	hulp="Eén stap per regel, zonder nummer: de app nummert zelf. Max. {MAX_STAPPEN} stappen van {MAX_STAP_TEKENS} tekens."
	fout={fouten.stappen}
>
	{#snippet children(attr)}
		<textarea {...attr} name="stappen" rows="5">{waarden.stappen.join('\n')}</textarea>
	{/snippet}
</AdminVeld>

<AdminVeld
	label="Hint"
	hulp="Optioneel. Verschijnt achter de knop &quot;Hint nodig?&quot; in de app. Max. {MAX_HINT_TEKENS} tekens."
	fout={fouten.hint}
>
	{#snippet children(attr)}
		<textarea {...attr} name="hint" rows="2" maxlength={MAX_HINT_TEKENS}>{waarden.hint}</textarea>
	{/snippet}
</AdminVeld>

<fieldset class="audio">
	<legend class="label">Audio</legend>
	<div class="rij">
		<AdminVeld label="Kies een bestaand bestand" fout={fouten.audio_pad}>
			{#snippet children(attr)}
				<select {...attr} name="audio_pad">
					<option value="" selected={!waarden.audio_pad}>Geen audio</option>
					{#each audioOpties as pad (pad)}
						<option value={pad} selected={pad === waarden.audio_pad}>{pad}</option>
					{/each}
				</select>
			{/snippet}
		</AdminVeld>

		<AdminVeld
			label="… of upload een nieuw"
			hulp="Max. 20 MB. Vervangt de keuze hiernaast."
			fout={fouten.nieuwe_audio}
		>
			{#snippet children(attr)}
				<input {...attr} name="nieuwe_audio" type="file" accept="audio/*" />
			{/snippet}
		</AdminVeld>
	</div>
</fieldset>

<label class="vinkje">
	<input name="actief" type="checkbox" checked={waarden.actief} />
	Zichtbaar in de app
</label>

<style>
	.rij {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}

	.audio {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 0;
		padding: 16px;
		border: 1px solid var(--kleur-lijn);
		border-radius: var(--radius-klein);
	}

	.audio legend {
		padding: 0 6px;
		font-family: var(--font-titel);
		font-weight: 800;
	}

	.vinkje {
		display: flex;
		align-items: center;
		gap: 10px;
		font-weight: 700;
	}
</style>
