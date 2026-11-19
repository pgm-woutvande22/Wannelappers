import { publiekeUrl } from '#lib/server/opslag.js';
import { AUDIO_BUCKET } from '#lib/server/supabase.js';
import { probeer } from '#lib/server/tochtRegistratie.js';
import type { PageServerLoad } from './$types';

/** Pad van het welkomstbericht in de audio-bucket (beheer via /admin/audio). */
const INTRO_AUDIO = 'intro.mp3';

export const load: PageServerLoad = async ({ locals }) => {
	// Zonder Supabase-instellingen geen audio, maar het startscherm werkt gewoon.
	const introUrl = await probeer(
		async () => publiekeUrl(locals.supabase, AUDIO_BUCKET, INTRO_AUDIO),
		'Intro-audio'
	);
	return { introUrl };
};
