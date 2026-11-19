/** "52 min" of "1 u 05 min". */
export function formatDuur(seconden: number): string {
	const minuten = Math.round(seconden / 60);
	if (minuten < 60) return `${minuten} min`;
	const uren = Math.floor(minuten / 60);
	return `${uren} u ${String(minuten % 60).padStart(2, '0')} min`;
}

/** Duur tussen twee ISO-tijdstippen in seconden. */
export function secondenTussen(start: string, einde: string): number {
	return (new Date(einde).getTime() - new Date(start).getTime()) / 1000;
}

const datumFormaat = new Intl.DateTimeFormat('nl-BE', {
	dateStyle: 'medium',
	timeStyle: 'short'
});

export function formatDatum(iso: string): string {
	return datumFormaat.format(new Date(iso));
}
