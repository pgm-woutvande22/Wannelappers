import { fail, redirect } from '@sveltejs/kit';
import { vereisAdmin } from '#lib/server/admin.js';
import { laadFormulierOpties } from '#lib/server/oefeningen.js';
import { leesOefening, type OefeningInvoer } from '#lib/utils/oefeningFormulier.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const opties = await laadFormulierOpties(locals.supabase);
	const gevraagdeStop = Number(url.searchParams.get('stop'));

	const leeg: OefeningInvoer = {
		stop_nr: opties.stops.some((s) => s.nr === gevraagdeStop)
			? gevraagdeStop
			: (opties.stops[0]?.nr ?? 0),
		titel: '',
		type: 'keuze',
		opdracht: '',
		opties: [],
		antwoord: null,
		audio_pad: null,
		volgorde: 0,
		actief: true
	};

	return { ...opties, oefening: leeg };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		await vereisAdmin(locals);
		const { stops } = await laadFormulierOpties(locals.supabase);
		const { waarden, fouten, geldig } = leesOefening(
			await request.formData(),
			stops.map((s) => s.nr)
		);
		if (!geldig) return fail(400, { waarden, fouten });

		const { error } = await locals.supabase.from('oefeningen').insert(waarden);
		if (error) return fail(500, { waarden, fouten: { titel: `Opslaan mislukt: ${error.message}` } });

		redirect(303, '/admin/oefeningen');
	}
};
