import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const [statistieken, tochten, kinderen] = await Promise.all([
		locals.supabase.from('tocht_statistieken').select('*').single(),
		locals.supabase
			.from('tochten')
			.select('id, gestart_op, beeindigd_op, kinderen(leeftijd)')
			.order('gestart_op', { ascending: false })
			.limit(25),
		locals.supabase.from('kinderen').select('leeftijd')
	]);

	for (const { error: fout } of [statistieken, tochten, kinderen]) {
		if (fout) error(500, `Statistieken ophalen mislukt: ${fout.message}`);
	}
	if (!statistieken.data || !tochten.data || !kinderen.data) error(500, 'Geen gegevens ontvangen');

	/** Aantal kinderen per leeftijd, oplopend. */
	const perLeeftijd = new Map<number, number>();
	for (const { leeftijd } of kinderen.data) {
		perLeeftijd.set(leeftijd, (perLeeftijd.get(leeftijd) ?? 0) + 1);
	}

	return {
		statistieken: statistieken.data,
		tochten: tochten.data.map((t) => ({
			id: t.id,
			gestart_op: t.gestart_op,
			beeindigd_op: t.beeindigd_op,
			leeftijden: t.kinderen.map((k) => k.leeftijd).sort((a, b) => a - b)
		})),
		leeftijden: [...perLeeftijd]
			.sort(([a], [b]) => a - b)
			.map(([leeftijd, aantal]) => ({ leeftijd, aantal }))
	};
};
