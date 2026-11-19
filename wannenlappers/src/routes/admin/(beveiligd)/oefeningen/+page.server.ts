import { error, fail } from '@sveltejs/kit';
import { vereisAdmin } from '#lib/server/admin.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [stops, oefeningen] = await Promise.all([
		locals.supabase.from('stops').select('nr, naam').order('nr'),
		locals.supabase
			.from('oefeningen')
			.select('id, stop_nr, titel, audio_pad, volgorde, actief, oefening_fotos(id)')
			.order('stop_nr')
			.order('volgorde')
	]);

	if (stops.error) error(500, `Stops ophalen mislukt: ${stops.error.message}`);
	if (oefeningen.error) error(500, `Oefeningen ophalen mislukt: ${oefeningen.error.message}`);
	const alleOefeningen = oefeningen.data;

	return {
		stops: stops.data.map((stop) => ({
			...stop,
			oefeningen: alleOefeningen.filter((o) => o.stop_nr === stop.nr)
		}))
	};
};

export const actions: Actions = {
	wisselActief: async ({ request, locals }) => {
		await vereisAdmin(locals);
		const data = await request.formData();
		const id = String(data.get('id') ?? '');
		const actief = data.get('actief') === 'true';

		const { error: fout } = await locals.supabase
			.from('oefeningen')
			.update({ actief })
			.eq('id', id);
		if (fout) return fail(500, { fout: `Wijzigen mislukt: ${fout.message}` });
	}
};
