import { error, fail, redirect } from '@sveltejs/kit';
import { vereisAdmin } from '#lib/server/admin.js';
import { laadFormulierOpties } from '#lib/server/oefeningen.js';
import { leesOefening } from '#lib/utils/oefeningFormulier.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const [opties, oefening] = await Promise.all([
		laadFormulierOpties(locals.supabase),
		locals.supabase
			.from('oefeningen')
			.select('stop_nr, titel, type, opdracht, opties, antwoord, audio_pad, volgorde, actief')
			.eq('id', params.id)
			.maybeSingle()
	]);

	if (oefening.error) error(500, `Oefening ophalen mislukt: ${oefening.error.message}`);
	if (!oefening.data) error(404, 'Oefening niet gevonden');

	return { ...opties, oefening: oefening.data };
};

export const actions: Actions = {
	opslaan: async ({ request, locals, params }) => {
		await vereisAdmin(locals);
		const { stops } = await laadFormulierOpties(locals.supabase);
		const { waarden, fouten, geldig } = leesOefening(
			await request.formData(),
			stops.map((s) => s.nr)
		);
		if (!geldig) return fail(400, { waarden, fouten });

		const { error: fout } = await locals.supabase
			.from('oefeningen')
			.update(waarden)
			.eq('id', params.id);
		if (fout) return fail(500, { waarden, fouten: { titel: `Opslaan mislukt: ${fout.message}` } });

		redirect(303, '/admin/oefeningen');
	},

	verwijderen: async ({ locals, params }) => {
		await vereisAdmin(locals);
		const { error: fout } = await locals.supabase.from('oefeningen').delete().eq('id', params.id);
		if (fout) return fail(500, { verwijderFout: `Verwijderen mislukt: ${fout.message}` });

		redirect(303, '/admin/oefeningen');
	}
};
