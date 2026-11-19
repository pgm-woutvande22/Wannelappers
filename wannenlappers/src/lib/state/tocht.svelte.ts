import { SvelteSet } from 'svelte/reactivity';
import { stops } from '#lib/data/stops.js';

/**
 * Voortgang van de tocht, gedeeld tussen de schermen.
 * Wordt alleen in de browser aangepast.
 */
class Tocht {
	/** Nummers van de stops waarvan de stempel verzameld is. */
	verzameld = new SvelteSet<number>();

	readonly stempelStops = stops.filter((s) => s.stempel);

	aantal = $derived(this.verzameld.size);
	totaal = this.stempelStops.length;

	/** Eerste stempelstop die nog niet verzameld is; daarna de schatkist. */
	volgende = $derived(
		this.stempelStops.find((s) => !this.verzameld.has(s.nr)) ?? stops[stops.length - 1]
	);

	kistOpen = $derived(this.aantal === this.totaal);
}

export const tocht = new Tocht();
