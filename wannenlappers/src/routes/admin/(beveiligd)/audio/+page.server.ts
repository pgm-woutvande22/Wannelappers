import { error, fail } from '@sveltejs/kit';
import { vereisAdmin } from '#lib/server/admin.js';
import { lijstAudio, MAX_AUDIO_BYTES, veiligeBestandsnaam } from '#lib/server/audio.js';
import { AUDIO_BUCKET } from '#lib/server/supabase.js';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [audio, oefeningen] = await Promise.all([
		lijstAudio(locals.supabase),
		locals.supabase.from('oefeningen').select('titel, audio_pad').not('audio_pad', 'is', null)
	]);
	if (oefeningen.error) error(500, `Oefeningen ophalen mislukt: ${oefeningen.error.message}`);

	return {
		bestanden: audio.map((bestand) => ({
			...bestand,
			gebruiktDoor: oefeningen.data.filter((o) => o.audio_pad === bestand.pad).map((o) => o.titel)
		}))
	};
};

export const actions: Actions = {
	uploaden: async ({ request, locals }) => {
		await vereisAdmin(locals);
		const bestand = (await request.formData()).get('bestand');

		if (!(bestand instanceof File) || bestand.size === 0) {
			return fail(400, { uploadFout: 'Kies een audiobestand.' });
		}
		if (!bestand.type.startsWith('audio/')) {
			return fail(400, { uploadFout: 'Dat is geen audiobestand.' });
		}
		if (bestand.size > MAX_AUDIO_BYTES) {
			return fail(400, { uploadFout: 'Het bestand is groter dan 20 MB.' });
		}

		const pad = veiligeBestandsnaam(bestand.name);
		const { error: fout } = await locals.supabase.storage
			.from(AUDIO_BUCKET)
			.upload(pad, bestand, { contentType: bestand.type, upsert: false });

		if (fout) {
			const bestaat = 'statusCode' in fout && String(fout.statusCode) === '409';
			return fail(bestaat ? 409 : 500, {
				uploadFout: bestaat
					? `Er bestaat al een bestand "${pad}". Verwijder het eerst of geef je bestand een andere naam.`
					: `Uploaden mislukt: ${fout.message}`
			});
		}

		return { geupload: pad };
	},

	verwijderen: async ({ request, locals }) => {
		await vereisAdmin(locals);
		const pad = String((await request.formData()).get('pad') ?? '');

		const { count, error: telFout } = await locals.supabase
			.from('oefeningen')
			.select('id', { count: 'exact', head: true })
			.eq('audio_pad', pad);
		if (telFout) return fail(500, { verwijderFout: telFout.message });
		if (count) {
			return fail(409, {
				verwijderFout: `"${pad}" wordt nog gebruikt door ${count} oefening(en). Koppel het daar eerst los.`
			});
		}

		const { error: fout } = await locals.supabase.storage.from(AUDIO_BUCKET).remove([pad]);
		if (fout) return fail(500, { verwijderFout: `Verwijderen mislukt: ${fout.message}` });

		return { verwijderd: pad };
	}
};
