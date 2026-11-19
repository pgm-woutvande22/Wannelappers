<script lang="ts">
	import AdminVeld from '#lib/components/admin/AdminVeld.svelte';
	import {
		OEFENING_TYPES,
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

	/** Volgt het type uit de props, maar verandert mee met de keuzelijst. */
	let type = $derived(waarden.type);
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

<AdminVeld label="Type" fout={fouten.type}>
	{#snippet children(attr)}
		<select {...attr} name="type" onchange={(e) => (type = e.currentTarget.value as typeof type)}>
			{#each OEFENING_TYPES as t (t.waarde)}
				<option value={t.waarde} selected={t.waarde === waarden.type}>{t.label}</option>
			{/each}
		</select>
	{/snippet}
</AdminVeld>

<AdminVeld
	label="Opdracht"
	hulp="Wat Wannes zegt of wat er op het scherm staat."
	fout={fouten.opdracht}
>
	{#snippet children(attr)}
		<textarea {...attr} name="opdracht" rows="4">{waarden.opdracht}</textarea>
	{/snippet}
</AdminVeld>

{#if type === 'keuze'}
	<AdminVeld label="Opties" hulp="Eén optie per regel." fout={fouten.opties}>
		{#snippet children(attr)}
			<textarea {...attr} name="opties" rows="4">{waarden.opties.join('\n')}</textarea>
		{/snippet}
	</AdminVeld>
{/if}

{#if type !== 'luister'}
	<AdminVeld
		label="Juist antwoord"
		hulp={type === 'keuze'
			? 'Precies zoals één van de opties.'
			: type === 'code'
				? 'De code die de kinderen moeten invullen.'
				: 'Optioneel: een voorbeeldantwoord.'}
		fout={fouten.antwoord}
	>
		{#snippet children(attr)}
			<input {...attr} name="antwoord" type="text" value={waarden.antwoord ?? ''} />
		{/snippet}
	</AdminVeld>
{/if}

<AdminVeld
	label="Audio"
	hulp="Upload nieuwe bestanden via de pagina Audio."
	fout={fouten.audio_pad}
>
	{#snippet children(attr)}
		<select {...attr} name="audio_pad">
			<option value="" selected={!waarden.audio_pad}>Geen audio</option>
			{#each audioOpties as pad (pad)}
				<option value={pad} selected={pad === waarden.audio_pad}>{pad}</option>
			{/each}
		</select>
	{/snippet}
</AdminVeld>

<label class="vinkje">
	<input name="actief" type="checkbox" checked={waarden.actief} />
	Zichtbaar in de app
</label>

<style>
	.rij {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 16px;
	}

	.vinkje {
		display: flex;
		align-items: center;
		gap: 10px;
		font-weight: 700;
	}
</style>
