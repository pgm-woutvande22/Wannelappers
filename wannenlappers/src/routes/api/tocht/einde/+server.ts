import { error, json } from '@sveltejs/kit';
import { probeer } from '#lib/server/tochtRegistratie.js';
import type { RequestHandler } from './$types';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Markeert een tocht als afgerond. Een endpoint i.p.v. een form action,
 * omdat dit vanzelf gebeurt zodra de kist open mag (er is geen formulier).
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	const body: unknown = await request.json().catch(() => null);
	const id = typeof body === 'object' && body !== null && 'id' in body ? body.id : undefined;
	if (typeof id !== 'string' || !UUID.test(id)) error(400, 'Ongeldig tocht-id');

	const gelukt = await probeer(async () => {
		const { error: fout } = await locals.supabase.rpc('beeindig_tocht', { tocht: id });
		if (fout) throw new Error(fout.message);
		return true;
	}, 'Tocht afronden');

	return json({ ok: gelukt === true });
};
