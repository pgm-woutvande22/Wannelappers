import { AUDIO_BUCKET, type Supabase } from '#lib/server/supabase.js';

export interface AudioBestand {
	pad: string;
	url: string;
	grootte: number;
	bijgewerkt_op: string | null;
}

/** Alle audiobestanden in de bucket (bovenste niveau). */
export async function lijstAudio(supabase: Supabase): Promise<AudioBestand[]> {
	const { data, error } = await supabase.storage
		.from(AUDIO_BUCKET)
		.list('', { limit: 1000, sortBy: { column: 'name', order: 'asc' } });
	if (error) throw new Error(`Audio ophalen mislukt: ${error.message}`);

	return (
		data
			// Mappen hebben geen id; '.emptyFolderPlaceholder' en co. overslaan.
			.filter((b) => b.id !== null && !b.name.startsWith('.'))
			.map((b) => ({
				pad: b.name,
				url: supabase.storage.from(AUDIO_BUCKET).getPublicUrl(b.name).data.publicUrl,
				grootte: typeof b.metadata?.size === 'number' ? b.metadata.size : 0,
				bijgewerkt_op: b.updated_at ?? null
			}))
	);
}

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
	const b = schoon(basis) || 'audio';
	const e = schoon(extensie);
	return e ? `${b}.${e}` : b;
}

export const MAX_AUDIO_BYTES = 20 * 1024 * 1024;
