import { isHttpError } from '@sveltejs/kit';

/**
 * Statistieken zijn "best effort": als Supabase niet ingesteld of onbereikbaar is,
 * mag de tocht gewoon doorgaan. Geeft het resultaat terug, of null bij een fout.
 */
export async function probeer<T>(taak: () => Promise<T>, wat: string): Promise<T | null> {
	try {
		return await taak();
	} catch (fout) {
		const reden = isHttpError(fout) ? fout.body.message : String(fout);
		console.warn(`${wat} mislukt: ${reden}`);
		return null;
	}
}

/** Zet de leeftijden uit het formulier om; null als ze niet geldig zijn. */
export function leesLeeftijden(waarden: FormDataEntryValue[]): number[] | null {
	const leeftijden = waarden.map((w) => Number(w));
	const geldig =
		leeftijden.length >= 1 &&
		leeftijden.length <= 20 &&
		leeftijden.every((l) => Number.isInteger(l) && l >= 1 && l <= 18);
	return geldig ? leeftijden : null;
}
