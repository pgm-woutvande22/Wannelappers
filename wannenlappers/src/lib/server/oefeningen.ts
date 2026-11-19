import { error } from '@sveltejs/kit';
import { lijstAudio, uploadAudio } from '#lib/server/audio.js';
import { gekozenBestand } from '#lib/server/opslag.js';
import type { Supabase } from '#lib/server/supabase.js';
import { leesOefening } from '#lib/utils/oefeningFormulier.js';

/** Stops en audiobestanden voor de keuzelijsten van het oefeningformulier. */
export async function laadFormulierOpties(supabase: Supabase) {
	const [stops, audio] = await Promise.all([
		supabase.from('stops').select('nr, naam').order('nr'),
		lijstAudio(supabase)
	]);
	if (stops.error) error(500, `Stops ophalen mislukt: ${stops.error.message}`);

	return { stops: stops.data, audio: audio.map((a) => a.pad) };
}

/**
 * Leest het oefeningformulier, controleert het en uploadt een eventueel
 * nieuw audiobestand (dat dan de gekozen audio vervangt).
 */
export async function verwerkOefeningFormulier(supabase: Supabase, data: FormData) {
	const { stops } = await laadFormulierOpties(supabase);
	const resultaat = leesOefening(
		data,
		stops.map((s) => s.nr)
	);
	if (!resultaat.geldig) return resultaat;

	const nieuweAudio = gekozenBestand(data, 'nieuwe_audio');
	if (nieuweAudio) {
		const upload = await uploadAudio(supabase, nieuweAudio);
		if ('fout' in upload) {
			return { ...resultaat, fouten: { nieuwe_audio: upload.fout }, geldig: false };
		}
		resultaat.waarden.audio_pad = upload.pad;
	}

	return resultaat;
}
