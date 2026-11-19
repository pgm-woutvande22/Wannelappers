import { error } from '@sveltejs/kit';
import { publiekeUrl } from '#lib/server/opslag.js';
import { fotoUrl } from '#lib/server/fotos.js';
import { AUDIO_BUCKET } from '#lib/server/supabase.js';
import { probeer } from '#lib/server/tochtRegistratie.js';
import { stops } from '#lib/data/stops.js';
import type { PageServerLoad } from './$types';

interface OefeningInhoud {
	id: string;
	titel: string;
	tekst: string;
	audioUrl: string | null;
	fotos: { id: string; url: string; beschrijving: string }[];
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const stop = stops.find((s) => String(s.nr) === params.nr);
	if (!stop) error(404, 'Deze stop bestaat niet');

	// Lukt het ophalen niet (geen verbinding, Supabase niet ingesteld), dan toont het scherm
	// een vriendelijke boodschap in plaats van een foutpagina.
	const oefeningen = await probeer(async () => {
		const { data, error: fout } = await locals.supabase
			.from('oefeningen')
			.select('id, titel, tekst, audio_pad, oefening_fotos(id, pad, beschrijving, volgorde)')
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
				audioUrl: o.audio_pad ? publiekeUrl(locals.supabase, AUDIO_BUCKET, o.audio_pad) : null,
				fotos: o.oefening_fotos.map((f) => ({
					id: f.id,
					url: fotoUrl(locals.supabase, f.pad),
					beschrijving: f.beschrijving
				}))
			})
		);
	}, `Oefeningen voor stop ${stop.nr} ophalen`);

	return { stop, oefeningen, fout: oefeningen === null };
};
