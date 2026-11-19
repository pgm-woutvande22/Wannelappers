import { error, fail, redirect } from '@sveltejs/kit';
import { vereisAdmin } from '#lib/server/admin.js';
import { fotoUrl, uploadFoto, verwijderFotoBestanden } from '#lib/server/fotos.js';
import { laadFormulierOpties, verwerkOefeningFormulier } from '#lib/server/oefeningen.js';
import { gekozenBestand } from '#lib/server/opslag.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const [opties, oefening, fotos] = await Promise.all([
		laadFormulierOpties(locals.supabase),
		locals.supabase
			.from('oefeningen')
			.select('stop_nr, titel, tekst, stappen, hint, audio_pad, volgorde, actief')
			.eq('id', params.id)
			.maybeSingle(),
		locals.supabase
			.from('oefening_fotos')
			.select('id, pad, beschrijving')
			.eq('oefening_id', params.id)
			.order('volgorde')
			.order('aangemaakt_op')
	]);

	if (oefening.error) error(500, `Oefening ophalen mislukt: ${oefening.error.message}`);
	if (fotos.error) error(500, `Foto's ophalen mislukt: ${fotos.error.message}`);
	if (!oefening.data) error(404, 'Oefening niet gevonden');

	return {
		...opties,
		oefening: oefening.data,
		fotos: fotos.data.map((f) => ({
			id: f.id,
			url: fotoUrl(locals.supabase, f.pad),
			beschrijving: f.beschrijving
		})),
		/** Net aangemaakt: toon een hint om foto's toe te voegen. */
		nieuw: url.searchParams.has('nieuw')
	};
};

function tekstVeld(data: FormData, naam: string) {
	const waarde = data.get(naam);
	return typeof waarde === 'string' ? waarde.trim() : '';
}

export const actions: Actions = {
	opslaan: async ({ request, locals, params }) => {
		await vereisAdmin(locals);
		const { waarden, fouten, geldig } = await verwerkOefeningFormulier(
			locals.supabase,
			await request.formData()
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
		const { data: fotos } = await locals.supabase
			.from('oefening_fotos')
			.select('pad')
			.eq('oefening_id', params.id);

		const { error: fout } = await locals.supabase.from('oefeningen').delete().eq('id', params.id);
		if (fout) return fail(500, { verwijderFout: `Verwijderen mislukt: ${fout.message}` });

		// De rijen verdwijnen mee (on delete cascade); de bestanden moeten apart weg.
		await verwijderFotoBestanden(locals.supabase, (fotos ?? []).map((f) => f.pad));
		redirect(303, '/admin/oefeningen');
	},

	fotoToevoegen: async ({ request, locals, params }) => {
		await vereisAdmin(locals);
		const data = await request.formData();
		const bestand = gekozenBestand(data, 'foto');
		const beschrijving = tekstVeld(data, 'beschrijving');

		if (!bestand) return fail(400, { fotoFout: 'Kies een foto.', beschrijving });
		if (!beschrijving) {
			return fail(400, { fotoFout: 'Beschrijf wat er op de foto staat.', beschrijving });
		}

		const upload = await uploadFoto(locals.supabase, params.id, bestand);
		if ('fout' in upload) return fail(400, { fotoFout: upload.fout, beschrijving });

		const { count } = await locals.supabase
			.from('oefening_fotos')
			.select('id', { count: 'exact', head: true })
			.eq('oefening_id', params.id);

		const { error: fout } = await locals.supabase.from('oefening_fotos').insert({
			oefening_id: params.id,
			pad: upload.pad,
			beschrijving: beschrijving.slice(0, 300),
			volgorde: count ?? 0
		});
		if (fout) {
			await verwijderFotoBestanden(locals.supabase, [upload.pad]);
			return fail(500, { fotoFout: `Opslaan mislukt: ${fout.message}`, beschrijving });
		}

		return { fotoToegevoegd: true };
	},

	fotoBijwerken: async ({ request, locals }) => {
		await vereisAdmin(locals);
		const data = await request.formData();
		const id = tekstVeld(data, 'id');
		const beschrijving = tekstVeld(data, 'beschrijving');
		if (!beschrijving) return fail(400, { fotoFout: 'Een foto heeft een beschrijving nodig.' });

		const { error: fout } = await locals.supabase
			.from('oefening_fotos')
			.update({ beschrijving: beschrijving.slice(0, 300) })
			.eq('id', id);
		if (fout) return fail(500, { fotoFout: `Opslaan mislukt: ${fout.message}` });
	},

	/** Wisselt een foto met de vorige of volgende. */
	fotoVerplaatsen: async ({ request, locals, params }) => {
		await vereisAdmin(locals);
		const data = await request.formData();
		const id = tekstVeld(data, 'id');
		const stap = tekstVeld(data, 'richting') === 'omhoog' ? -1 : 1;

		const { data: fotos, error: fout } = await locals.supabase
			.from('oefening_fotos')
			.select('id')
			.eq('oefening_id', params.id)
			.order('volgorde')
			.order('aangemaakt_op');
		if (fout) return fail(500, { fotoFout: fout.message });

		const ids = fotos.map((f) => f.id);
		const van = ids.indexOf(id);
		const naar = van + stap;
		if (van === -1 || naar < 0 || naar >= ids.length) return;
		[ids[van], ids[naar]] = [ids[naar], ids[van]];

		// Volgorde opnieuw nummeren, zodat gelijke waarden geen rol meer spelen.
		const resultaten = await Promise.all(
			ids.map((fotoId, volgorde) =>
				locals.supabase.from('oefening_fotos').update({ volgorde }).eq('id', fotoId)
			)
		);
		const mislukt = resultaten.find((r) => r.error);
		if (mislukt?.error) return fail(500, { fotoFout: mislukt.error.message });
	},

	fotoVerwijderen: async ({ request, locals }) => {
		await vereisAdmin(locals);
		const id = tekstVeld(await request.formData(), 'id');

		const { data: foto, error: fout } = await locals.supabase
			.from('oefening_fotos')
			.delete()
			.eq('id', id)
			.select('pad')
			.maybeSingle();
		if (fout) return fail(500, { fotoFout: `Verwijderen mislukt: ${fout.message}` });
		if (foto) await verwijderFotoBestanden(locals.supabase, [foto.pad]);
	}
};
