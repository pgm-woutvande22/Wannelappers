/**
 * Gegevens van het team, gedeeld tussen de schermen.
 * Wordt alleen in de browser aangepast (bij het indienen van het teamformulier).
 */
class Team {
	naam = $state('');
	leeftijd = $state<string | undefined>();
}

export const team = new Team();
