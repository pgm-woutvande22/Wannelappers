/** Waarden van het oefeningformulier, zoals ze in de database komen. */
export interface OefeningInvoer {
	stop_nr: number;
	titel: string;
	tekst: string;
	audio_pad: string | null;
	volgorde: number;
	actief: boolean;
}

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
		audio_pad: tekst(data, 'audio_pad') || null,
		volgorde: Number(tekst(data, 'volgorde')) || 0,
		actief: data.get('actief') === 'on'
	};

	const fouten: OefeningFouten = {};
	if (!stopNrs.includes(waarden.stop_nr)) fouten.stop_nr = 'Kies een stop.';
	if (!waarden.titel) fouten.titel = 'Geef de oefening een titel.';
	else if (waarden.titel.length > 120) fouten.titel = 'Maximaal 120 tekens.';

	return { waarden, fouten, geldig: Object.keys(fouten).length === 0 };
}

/** Tekst met lege regels ertussen -> alinea's. */
export function alineas(tekst: string): string[] {
	return tekst
		.split(/\n\s*\n/)
		.map((a) => a.trim())
		.filter(Boolean);
}
