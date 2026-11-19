import { SvelteSet } from 'svelte/reactivity';
import { stops, type Stop } from '#lib/data/stops.js';

export type StopStatus = 'verzameld' | 'volgende' | 'open';

/**
 * Voortgang van de tocht, gedeeld tussen de schermen.
 * Wordt alleen in de browser aangepast.
 */
class Tocht {
	/** Id van de tocht in de database (null als registreren mislukte of nog niet gebeurde). */
	id = $state<string | null>(null);
	/** true zodra het einde van de tocht naar de server gestuurd is. */
	afgemeld = $state(false);

	/** Nummers van de stops waarvan de stempel verzameld is. */
	verzameld = new SvelteSet<number>();

	readonly stempelStops = stops.filter((s) => s.stempel);
	readonly totaal = this.stempelStops.length;

	aantal = $derived(this.verzameld.size);

	/** Eerste stempelstop die nog niet verzameld is; daarna de schatkist. */
	volgende = $derived(
		this.stempelStops.find((s) => !this.verzameld.has(s.nr)) ?? stops[stops.length - 1]
	);

	kistOpen = $derived(this.aantal === this.totaal);

	status(stop: Stop): StopStatus {
		if (this.verzameld.has(stop.nr)) return 'verzameld';
		return stop.nr === this.volgende.nr ? 'volgende' : 'open';
	}
}

export const tocht = new Tocht();
