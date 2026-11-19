import { error, fail } from '@sveltejs/kit';
import { vereisAdmin } from '#lib/server/admin.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [stops, oefeningen, codes] = await Promise.all([
		locals.supabase.from('stops').select('nr, naam, stempel').order('nr'),
		locals.supabase
			.from('oefeningen')
			.select('id, stop_nr, titel, audio_pad, volgorde, actief, oefening_fotos(id)')
			.order('stop_nr')
			.order('volgorde'),
		locals.supabase.from('stop_codes').select('stop_nr, code, uitleg')
	]);

	if (stops.error) error(500, `Stops ophalen mislukt: ${stops.error.message}`);
	if (oefeningen.error) error(500, `Oefeningen ophalen mislukt: ${oefeningen.error.message}`);
	if (codes.error) error(500, `Codes ophalen mislukt: ${codes.error.message}`);
	const alleOefeningen = oefeningen.data;
	const alleCodes = codes.data;

	return {
		stops: stops.data.map((stop) => ({
			...stop,
			code: alleCodes.find((c) => c.stop_nr === stop.nr)?.code ?? '',
			uitleg: alleCodes.find((c) => c.stop_nr === stop.nr)?.uitleg ?? '',
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
	},

	/** Zet de code die kinderen bij een stop moeten invullen; leeg = geen code. */
	zetCode: async ({ request, locals }) => {
		await vereisAdmin(locals);
		const data = await request.formData();
		const stop_nr = Number(data.get('stop_nr'));
		const code = String(data.get('code') ?? '').trim();
		const uitleg = String(data.get('uitleg') ?? '').trim();

		if (code.length > 20) return fail(400, { fout: 'Een code is maximaal 20 tekens.' });
		if (uitleg.length > 200) return fail(400, { fout: 'De uitleg is maximaal 200 tekens.' });

		const { error: fout } = code
			? await locals.supabase.from('stop_codes').upsert({ stop_nr, code, uitleg })
			: await locals.supabase.from('stop_codes').delete().eq('stop_nr', stop_nr);
		if (fout) return fail(500, { fout: `Code opslaan mislukt: ${fout.message}` });

		return { codeOpgeslagen: stop_nr };
	}
};
