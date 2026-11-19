import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (await locals.haalGebruiker()) redirect(303, '/admin');
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '').trim();
		const wachtwoord = String(data.get('wachtwoord') ?? '');

		if (!email || !wachtwoord) {
			return fail(400, { email, fout: 'Vul je e-mailadres en wachtwoord in.' });
		}

		const { error } = await locals.supabase.auth.signInWithPassword({
			email,
			password: wachtwoord
		});
		if (error) {
			return fail(400, { email, fout: 'E-mailadres of wachtwoord klopt niet.' });
		}

		redirect(303, '/admin');
	}
};
