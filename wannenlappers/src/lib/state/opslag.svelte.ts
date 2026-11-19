import { stops } from '#lib/data/stops.js';
import { team } from '#lib/state/team.svelte.js';
import { tocht } from '#lib/state/tocht.svelte.js';

/**
 * Bewaart team en voortgang in localStorage, zodat herladen of later terugkomen
 * de tocht niet wist. Alles blijft op het toestel van de gebruiker.
 */

const SLEUTEL = 'wannenlappers:tocht';
const VERSIE = 1;
/** Na een dag zonder gebruik begint een volgend gezin op hetzelfde toestel opnieuw. */
const GELDIG_MS = 24 * 60 * 60 * 1000;

interface Opgeslagen {
	versie: typeof VERSIE;
	bewaardOp: number;
	team: { naam: string; leeftijden: number[] };
	tocht: { id: string | null; afgemeld: boolean; verzameld: number[] };
}

const geldigeStops = new Set(stops.filter((s) => s.stempel).map((s) => s.nr));
const isGetal = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x);

/** Controleert wat er in localStorage stond: het kan oud, kapot of aangepast zijn. */
function lees(tekst: string | null): Opgeslagen | null {
	if (!tekst) return null;
	try {
		const data: unknown = JSON.parse(tekst);
		if (typeof data !== 'object' || data === null) return null;
		const d = data as Partial<Opgeslagen>;
		if (d.versie !== VERSIE || !isGetal(d.bewaardOp)) return null;
		if (Date.now() - d.bewaardOp > GELDIG_MS) return null;

		const naam = typeof d.team?.naam === 'string' ? d.team.naam.slice(0, 20) : '';
		const leeftijden = Array.isArray(d.team?.leeftijden)
			? d.team.leeftijden.filter((l) => isGetal(l) && l >= 1 && l <= 18).slice(0, 20)
			: [];
		const id = typeof d.tocht?.id === 'string' ? d.tocht.id : null;
		const verzameld = Array.isArray(d.tocht?.verzameld)
			? d.tocht.verzameld.filter((nr) => isGetal(nr) && geldigeStops.has(nr))
			: [];

		return {
			versie: VERSIE,
			bewaardOp: d.bewaardOp,
			team: { naam, leeftijden },
			tocht: { id, afgemeld: d.tocht?.afgemeld === true, verzameld }
		};
	} catch {
		return null;
	}
}

class Opslag {
	/** true zodra de bewaarde voortgang (als die er was) teruggezet is. */
	hersteld = $state(false);

	/** Er is een lopende tocht: team gekozen of al een stempel. */
	bezig = $derived(team.naam !== '' || tocht.aantal > 0);

	/** Eén keer na het laden in de browser. */
	herstel() {
		let opgeslagen: Opgeslagen | null = null;
		try {
			opgeslagen = lees(localStorage.getItem(SLEUTEL));
		} catch {
			// localStorage niet beschikbaar (privévenster, geblokkeerd): gewoon zonder.
		}

		if (opgeslagen) {
			team.naam = opgeslagen.team.naam;
			team.leeftijden = opgeslagen.team.leeftijden;
			tocht.id = opgeslagen.tocht.id;
			tocht.afgemeld = opgeslagen.tocht.afgemeld;
			tocht.verzameld.clear();
			for (const nr of opgeslagen.tocht.verzameld) tocht.verzameld.add(nr);
		}
		this.hersteld = true;
	}

	/** Schrijft de huidige stand weg (leest alle velden, dus reactief te gebruiken in $effect). */
	bewaar() {
		const data: Opgeslagen = {
			versie: VERSIE,
			bewaardOp: Date.now(),
			team: { naam: team.naam, leeftijden: [...team.leeftijden] },
			tocht: { id: tocht.id, afgemeld: tocht.afgemeld, verzameld: [...tocht.verzameld] }
		};
		try {
			localStorage.setItem(SLEUTEL, JSON.stringify(data));
		} catch {
			// Vol of geblokkeerd: de tocht werkt verder, alleen zonder onthouden.
		}
	}

	/** Alles vergeten en opnieuw beginnen. */
	wis() {
		team.naam = '';
		team.leeftijden = [];
		tocht.begin(null);
		try {
			localStorage.removeItem(SLEUTEL);
		} catch {
			// Niets aan te doen.
		}
	}
}

export const opslag = new Opslag();
