import { createServerClient } from '@supabase/ssr';
import { error, type Cookies } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_PUBLISHABLE_KEY, PUBLIC_SUPABASE_URL } from '$app/env/public';
import type { Database } from '#lib/types/database.js';

/** Supabase-client per request; de sessie zit in cookies. */
export function maakSupabase(cookies: Cookies) {
	if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
		error(
			503,
			'Supabase is niet ingesteld. Kopieer .env.example naar .env, vul de publishable key in en herstart de dev-server.'
		);
	}

	return createServerClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
		cookies: {
			getAll: () => cookies.getAll(),
			setAll: (nieuw) => {
				for (const { name, value, options } of nieuw) {
					cookies.set(name, value, { ...options, path: '/' });
				}
			}
		}
	});
}

export type Supabase = ReturnType<typeof maakSupabase>;

/** Bucket met alle audiobestanden. */
export const AUDIO_BUCKET = 'audio';
