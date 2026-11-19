import { introAudioUrl } from '#lib/server/audio.js';
import type { PageServerLoad } from './$types';

// Zonder Supabase-instellingen geen audio, maar het startscherm werkt gewoon.
export const load: PageServerLoad = ({ locals }) => ({ introUrl: introAudioUrl(locals) });
