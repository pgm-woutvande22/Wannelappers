import { publiekeUrl, upload, veiligeBestandsnaam } from '#lib/server/opslag.js';
import type { Supabase } from '#lib/server/supabase.js';

export const FOTO_BUCKET = 'fotos';
export const MAX_FOTO_BYTES = 10 * 1024 * 1024;

export interface Foto {
	id: string;
	url: string;
	beschrijving: string;
}

/** Uploadt een foto in de map van de oefening; een tijdstempel voorkomt dubbele namen. */
export function uploadFoto(supabase: Supabase, oefeningId: string, bestand: File) {
	const pad = `${oefeningId}/${Date.now()}-${veiligeBestandsnaam(bestand.name)}`;
	return upload(supabase, bestand, pad, {
		bucket: FOTO_BUCKET,
		soort: 'image/',
		soortNaam: 'foto',
		maxBytes: MAX_FOTO_BYTES
	});
}

export function fotoUrl(supabase: Supabase, pad: string): string {
	return publiekeUrl(supabase, FOTO_BUCKET, pad);
}

/** Verwijdert de bestanden van deze paden uit de bucket. */
export async function verwijderFotoBestanden(supabase: Supabase, paden: string[]) {
	if (paden.length === 0) return null;
	const { error } = await supabase.storage.from(FOTO_BUCKET).remove(paden);
	return error ? error.message : null;
}
