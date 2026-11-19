/**
 * Gegevens van het team, gedeeld tussen de schermen.
 * Wordt alleen in de browser aangepast (bij het indienen van het teamformulier).
 */
class Team {
	naam = $state('');
	/** Leeftijd van elk kind dat meespeelt. */
	leeftijden = $state<number[]>([]);

	/** Jongste kind: bepaalt hoe eenvoudig de opdrachten uitgelegd worden. */
	jongste = $derived(this.leeftijden.length ? Math.min(...this.leeftijden) : undefined);
}

export const team = new Team();
