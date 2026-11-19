import { fail } from '@sveltejs/kit';
import { leesLeeftijden, probeer } from '#lib/server/tochtRegistratie.js';
import type { Actions } from './$types';

export const actions: Actions = {
	/** Registreert de start van een tocht met de leeftijd van elk kind (geen namen). */
	default: async ({ request, locals }) => {
		const leeftijden = leesLeeftijden((await request.formData()).getAll('leeftijd'));
		if (!leeftijden) return fail(400, { fout: 'Kies voor elk kind een leeftijd.' });

		const tochtId = await probeer(async () => {
			const { data, error } = await locals.supabase.rpc('start_tocht', { leeftijden });
			if (error) throw new Error(error.message);
			return data;
		}, 'Tocht registreren');

		return { tochtId };
	}
};
