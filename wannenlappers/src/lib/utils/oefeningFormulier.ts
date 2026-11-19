/** Waarden van het oefeningformulier, zoals ze in de database komen. */
export interface OefeningInvoer {
	stop_nr: number;
	titel: string;
	tekst: string;
	stappen: string[];
	hint: string;
	audio_pad: string | null;
	volgorde: number;
	actief: boolean;
}

/** Richtlijnen voor tekst die buiten, staand en in de zon gelezen wordt. */
export const MAX_INTRO_TEKENS = 200;
export const MAX_STAP_TEKENS = 80;
export const MAX_STAPPEN = 5;
export const MAX_HINT_TEKENS = 200;

export type OefeningFouten = Partial<Record<keyof OefeningInvoer | 'nieuwe_audio', string>>;

function tekst(data: FormData, naam: string): string {
	const waarde = data.get(naam);
	return typeof waarde === 'string' ? waarde.trim() : '';
}

/** Leest en controleert het formulier (zonder bestanden). */
export function leesOefening(data: FormData, stopNrs: number[]) {
	const waarden: OefeningInvoer = {
		stop_nr: Number(tekst(data, 'stop_nr')),
		titel: tekst(data, 'titel'),
		tekst: tekst(data, 'tekst'),
		stappen: tekst(data, 'stappen')
			.split('\n')
			// "1) Zoek ..." of "2. Tel ..." -> "Zoek ...": de app nummert zelf.
			.map((s) => s.trim().replace(/^\d+\s*[).:-]\s*/, ''))
			.filter(Boolean),
		hint: tekst(data, 'hint'),
		audio_pad: tekst(data, 'audio_pad') || null,
		volgorde: Number(tekst(data, 'volgorde')) || 0,
		actief: data.get('actief') === 'on'
	};

	const fouten: OefeningFouten = {};
	if (!stopNrs.includes(waarden.stop_nr)) fouten.stop_nr = 'Kies een stop.';
	if (!waarden.titel) fouten.titel = 'Geef de oefening een titel.';
	else if (waarden.titel.length > 120) fouten.titel = 'Maximaal 120 tekens.';
	if (waarden.tekst.length > MAX_INTRO_TEKENS) {
		fouten.tekst = `Maximaal ${MAX_INTRO_TEKENS} tekens (nu ${waarden.tekst.length}). Hou het op twee korte zinnen.`;
	}
	if (waarden.hint.length > MAX_HINT_TEKENS) {
		fouten.hint = `Maximaal ${MAX_HINT_TEKENS} tekens.`;
	}
	if (waarden.stappen.length > MAX_STAPPEN) {
		fouten.stappen = `Maximaal ${MAX_STAPPEN} stappen.`;
	} else {
		const teLang = waarden.stappen.findIndex((s) => s.length > MAX_STAP_TEKENS);
		if (teLang !== -1) {
			fouten.stappen = `Stap ${teLang + 1} is te lang (max. ${MAX_STAP_TEKENS} tekens).`;
		}
	}

	return { waarden, fouten, geldig: Object.keys(fouten).length === 0 };
}

/** Tekst met lege regels ertussen -> alinea's. */
export function alineas(tekst: string): string[] {
	return tekst
		.split(/\n\s*\n/)
		.map((a) => a.trim())
		.filter(Boolean);
}
