import type { Supabase } from '#lib/server/supabase.js';

/** "Wannes Intro (1).MP3" -> "wannes-intro-1.mp3" */
export function veiligeBestandsnaam(naam: string): string {
	const punt = naam.lastIndexOf('.');
	const basis = punt > 0 ? naam.slice(0, punt) : naam;
	const extensie = punt > 0 ? naam.slice(punt + 1) : '';
	const schoon = (s: string) =>
		s
			.normalize('NFD')
			.replace(/[̀-ͯ]/g, '')
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	const b = schoon(basis) || 'bestand';
	const e = schoon(extensie);
	return e ? `${b}.${e}` : b;
}

/** Een gekozen bestand uit FormData, of null als het veld leeg is. */
export function gekozenBestand(data: FormData, naam: string): File | null {
	const bestand = data.get(naam);
	return bestand instanceof File && bestand.size > 0 ? bestand : null;
}

interface UploadRegels {
	bucket: string;
	/** Begin van het MIME-type, bv. 'audio/' of 'image/'. */
	soort: string;
	soortNaam: string;
	maxBytes: number;
}

export type UploadResultaat = { pad: string } | { fout: string };

/** Controleert en uploadt een bestand naar `pad` in de bucket. */
export async function upload(
	supabase: Supabase,
	bestand: File,
	pad: string,
	regels: UploadRegels
): Promise<UploadResultaat> {
	if (!bestand.type.startsWith(regels.soort)) {
		return { fout: `"${bestand.name}" is geen ${regels.soortNaam}.` };
	}
	if (bestand.size > regels.maxBytes) {
		return { fout: `"${bestand.name}" is groter dan ${regels.maxBytes / 1024 / 1024} MB.` };
	}

	const { error } = await supabase.storage
		.from(regels.bucket)
		.upload(pad, bestand, { contentType: bestand.type, upsert: false });
	if (!error) return { pad };

	const bestaat = 'statusCode' in error && String(error.statusCode) === '409';
	return {
		fout: bestaat
			? `Er bestaat al een bestand "${pad}". Verwijder het eerst of geef je bestand een andere naam.`
			: `Uploaden mislukt: ${error.message}`
	};
}

export function publiekeUrl(supabase: Supabase, bucket: string, pad: string): string {
	return supabase.storage.from(bucket).getPublicUrl(pad).data.publicUrl;
}
