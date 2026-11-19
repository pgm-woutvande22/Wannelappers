import { error } from '@sveltejs/kit';
import { lijstAudio } from '#lib/server/audio.js';
import type { Supabase } from '#lib/server/supabase.js';

/** Stops en audiobestanden voor de keuzelijsten van het oefeningformulier. */
export async function laadFormulierOpties(supabase: Supabase) {
	const [stops, audio] = await Promise.all([
		supabase.from('stops').select('nr, naam').order('nr'),
		lijstAudio(supabase)
	]);
	if (stops.error) error(500, `Stops ophalen mislukt: ${stops.error.message}`);

	return { stops: stops.data, audio: audio.map((a) => a.pad) };
}
