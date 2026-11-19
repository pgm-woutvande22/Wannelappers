import type { OefeningType } from '#lib/types/database.js';

export const OEFENING_TYPES: { waarde: OefeningType; label: string }[] = [
	{ waarde: 'keuze', label: 'Meerkeuze' },
	{ waarde: 'code', label: 'Code invullen' },
	{ waarde: 'open', label: 'Open vraag' },
	{ waarde: 'luister', label: 'Enkel luisteren' }
];

/** Waarden van het oefeningformulier, zoals ze in de database komen. */
export interface OefeningInvoer {
	stop_nr: number;
	titel: string;
	type: OefeningType;
	opdracht: string;
	opties: string[];
	antwoord: string | null;
	audio_pad: string | null;
	volgorde: number;
	actief: boolean;
}

export type OefeningFouten = Partial<Record<keyof OefeningInvoer, string>>;

function tekst(data: FormData, naam: string): string {
	const waarde = data.get(naam);
	return typeof waarde === 'string' ? waarde.trim() : '';
}

function isType(waarde: string): waarde is OefeningType {
	return OEFENING_TYPES.some((t) => t.waarde === waarde);
}

/** Leest en controleert het formulier. */
export function leesOefening(data: FormData, stopNrs: number[]) {
	const type = tekst(data, 'type');
	const opties = tekst(data, 'opties')
		.split('\n')
		.map((o) => o.trim())
		.filter(Boolean);

	const waarden: OefeningInvoer = {
		stop_nr: Number(tekst(data, 'stop_nr')),
		titel: tekst(data, 'titel'),
		type: isType(type) ? type : 'open',
		opdracht: tekst(data, 'opdracht'),
		opties: type === 'keuze' ? opties : [],
		antwoord: tekst(data, 'antwoord') || null,
		audio_pad: tekst(data, 'audio_pad') || null,
		volgorde: Number(tekst(data, 'volgorde')) || 0,
		actief: data.get('actief') === 'on'
	};

	const fouten: OefeningFouten = {};
	if (!stopNrs.includes(waarden.stop_nr)) fouten.stop_nr = 'Kies een stop.';
	if (!waarden.titel) fouten.titel = 'Geef de oefening een titel.';
	else if (waarden.titel.length > 120) fouten.titel = 'Maximaal 120 tekens.';
	if (!isType(type)) fouten.type = 'Kies een type.';
	if (waarden.type === 'keuze') {
		if (waarden.opties.length < 2) fouten.opties = 'Geef minstens 2 opties, één per regel.';
		else if (waarden.antwoord && !waarden.opties.includes(waarden.antwoord))
			fouten.antwoord = 'Het juiste antwoord moet één van de opties zijn.';
	}
	if (waarden.type === 'code' && !waarden.antwoord) fouten.antwoord = 'Vul de juiste code in.';

	return { waarden, fouten, geldig: Object.keys(fouten).length === 0 };
}
