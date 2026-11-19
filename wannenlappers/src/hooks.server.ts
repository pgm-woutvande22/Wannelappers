import type { Handle } from '@sveltejs/kit/hooks';
import { maakSupabase, type Supabase } from '#lib/server/supabase.js';

export const handle: Handle = async ({ event, resolve }) => {
	// Pas aanmaken wanneer een route Supabase gebruikt, zodat de tocht-schermen
	// ook werken zonder Supabase-instellingen in .env.
	let supabase: Supabase | undefined;
	Object.defineProperty(event.locals, 'supabase', {
		get: () => (supabase ??= maakSupabase(event.cookies))
	});

	/** Vraagt de gebruiker op bij Supabase (gevalideerd, niet enkel uit de cookie gelezen). */
	event.locals.haalGebruiker = async () => {
		const { data, error } = await event.locals.supabase.auth.getUser();
		return error ? null : data.user;
	};

	return resolve(event, {
		filterSerializedResponseHeaders: (naam) =>
			naam === 'content-range' || naam === 'x-supabase-api-version'
	});
};
