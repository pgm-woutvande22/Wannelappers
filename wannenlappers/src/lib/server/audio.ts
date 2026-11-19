import { publiekeUrl, upload, veiligeBestandsnaam } from '#lib/server/opslag.js';
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
				url: publiekeUrl(supabase, AUDIO_BUCKET, b.name),
				grootte: typeof b.metadata?.size === 'number' ? b.metadata.size : 0,
				bijgewerkt_op: b.updated_at ?? null
			}))
	);
}

export const MAX_AUDIO_BYTES = 20 * 1024 * 1024;

/** Pad van het welkomstbericht van Wannes in de audio-bucket (beheer via /admin/audio). */
const INTRO_AUDIO = 'intro.mp3';

/** Publieke URL van het welkomstbericht, of null zonder Supabase-instellingen. */
export function introAudioUrl(locals: App.Locals): string | null {
	try {
		return publiekeUrl(locals.supabase, AUDIO_BUCKET, INTRO_AUDIO);
	} catch {
		return null;
	}
}

/** Uploadt een audiobestand onder een veilige naam in de audio-bucket. */
export function uploadAudio(supabase: Supabase, bestand: File) {
	return upload(supabase, bestand, veiligeBestandsnaam(bestand.name), {
		bucket: AUDIO_BUCKET,
		soort: 'audio/',
		soortNaam: 'audiobestand',
		maxBytes: MAX_AUDIO_BYTES
	});
}
