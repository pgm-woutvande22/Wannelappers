import { error, fail } from '@sveltejs/kit';
import { publiekeUrl } from '#lib/server/opslag.js';
import { fotoUrl } from '#lib/server/fotos.js';
import { AUDIO_BUCKET } from '#lib/server/supabase.js';
import { probeer } from '#lib/server/tochtRegistratie.js';
import { stops } from '#lib/data/stops.js';
import type { CodeInfo } from '#lib/types/database.js';
import type { Actions, PageServerLoad } from './$types';

interface OefeningInhoud {
	id: string;
	titel: string;
	tekst: string;
	stappen: string[];
	hint: string;
	audioUrl: string | null;
	fotos: { id: string; url: string; beschrijving: string }[];
}

function vindStop(nr: string) {
	const stop = stops.find((s) => String(s.nr) === nr);
	if (!stop) error(404, 'Deze stop bestaat niet');
	return stop;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const stop = vindStop(params.nr);

	// Lukt het ophalen niet (geen verbinding, Supabase niet ingesteld), dan toont het scherm
	// een vriendelijke boodschap in plaats van een foutpagina.
	const [oefeningen, codeInfo] = await Promise.all([
		probeer(async () => {
			const { data, error: fout } = await locals.supabase
				.from('oefeningen')
				.select(
					'id, titel, tekst, stappen, hint, audio_pad, oefening_fotos(id, pad, beschrijving, volgorde)'
				)
				.eq('stop_nr', stop.nr)
				.eq('actief', true)
				.order('volgorde')
				.order('volgorde', { referencedTable: 'oefening_fotos' });
			if (fout) throw new Error(fout.message);

			return data.map(
				(o): OefeningInhoud => ({
					id: o.id,
					titel: o.titel,
					tekst: o.tekst,
					stappen: o.stappen,
					hint: o.hint,
					audioUrl: o.audio_pad ? publiekeUrl(locals.supabase, AUDIO_BUCKET, o.audio_pad) : null,
					fotos: o.oefening_fotos.map((f) => ({
						id: f.id,
						url: fotoUrl(locals.supabase, f.pad),
						beschrijving: f.beschrijving
					}))
				})
			);
		}, `Oefeningen voor stop ${stop.nr} ophalen`),
		stop.stempel
			? probeer(async (): Promise<CodeInfo> => {
					const { data, error: fout } = await locals.supabase.rpc('code_info', { stop: stop.nr });
					if (fout) throw new Error(fout.message);
					return data;
				}, `Code-info voor stop ${stop.nr}`)
			: null
	]);

	return {
		stop,
		oefeningen,
		fout: oefeningen === null,
		code: codeInfo ?? ({ soort: 'geen', lengte: 0, uitleg: '' } satisfies CodeInfo)
	};
};

export const actions: Actions = {
	/** Controleert de code op de server, zodat ze niet in de pagina staat. */
	code: async ({ params, request, locals }) => {
		const stop = vindStop(params.nr);
		const poging = String((await request.formData()).get('code') ?? '').trim();
		if (!poging) return fail(400, { fout: 'Typ eerst de code.' });

		const resultaat = await probeer(async () => {
			const { data, error: fout } = await locals.supabase.rpc('controleer_code', {
				stop: stop.nr,
				poging
			});
			if (fout) throw new Error(fout.message);
			return data;
		}, `Code controleren voor stop ${stop.nr}`);

		if (resultaat === 'juist') return { juist: true };
		if (resultaat === 'fout') return fail(400, { fout: 'Die code klopt niet. Kijk nog eens goed!' });
		return fail(503, { fout: 'We konden de code nu niet controleren. Probeer het opnieuw.' });
	}
};
