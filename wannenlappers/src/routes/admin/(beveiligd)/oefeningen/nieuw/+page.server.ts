import { fail, redirect } from '@sveltejs/kit';
import { vereisAdmin } from '#lib/server/admin.js';
import { laadFormulierOpties, verwerkOefeningFormulier } from '#lib/server/oefeningen.js';
import type { OefeningInvoer } from '#lib/utils/oefeningFormulier.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const opties = await laadFormulierOpties(locals.supabase);
	const gevraagdeStop = Number(url.searchParams.get('stop'));

	const leeg: OefeningInvoer = {
		stop_nr: opties.stops.some((s) => s.nr === gevraagdeStop)
			? gevraagdeStop
			: (opties.stops[0]?.nr ?? 0),
		titel: '',
		tekst: '',
		stappen: [],
		hint: '',
		audio_pad: null,
		volgorde: 0,
		actief: true
	};

	return { ...opties, oefening: leeg };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		await vereisAdmin(locals);
		const { waarden, fouten, geldig } = await verwerkOefeningFormulier(
			locals.supabase,
			await request.formData()
		);
		if (!geldig) return fail(400, { waarden, fouten });

		const { data, error } = await locals.supabase
			.from('oefeningen')
			.insert(waarden)
			.select('id')
			.single();
		if (error) return fail(500, { waarden, fouten: { titel: `Opslaan mislukt: ${error.message}` } });

		// Foto's voeg je toe op de bewerkpagina (ze horen bij een bestaande oefening).
		redirect(303, `/admin/oefeningen/${data.id}?nieuw`);
	}
};
