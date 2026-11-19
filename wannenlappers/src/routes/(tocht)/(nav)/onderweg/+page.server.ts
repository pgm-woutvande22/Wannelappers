import { introAudioUrl } from '#lib/server/audio.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => ({ introUrl: introAudioUrl(locals) });
