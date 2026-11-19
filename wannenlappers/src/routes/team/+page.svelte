<script lang="ts">
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import KeuzeTegels, { type Keuze } from '#lib/components/KeuzeTegels.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import SchermKop from '#lib/components/SchermKop.svelte';
	import Suggesties from '#lib/components/Suggesties.svelte';
	import TekstVeld from '#lib/components/TekstVeld.svelte';
	import Vak from '#lib/components/Vak.svelte';
	import { team } from '#lib/state/team.svelte.js';

	const suggesties = ['De Knotkoppen', 'Team Wan', 'De Wissenwevers'];

	const leeftijden: Keuze[] = [
		{ waarde: '4-5', label: '4–5', onderschrift: 'jaar' },
		{ waarde: '6-7', label: '6–7', onderschrift: 'jaar' },
		{ waarde: '8-9', label: '8–9', onderschrift: 'jaar' },
		{ waarde: '10-12', label: '10–12', onderschrift: 'jaar' }
	];

	let naam = $state(team.naam);
	let leeftijd = $state(team.leeftijd);
	/** Fouten pas tonen nadat iemand één keer op de knop drukte. */
	let geprobeerd = $state(false);

	const naamFout = $derived(
		geprobeerd && naam.trim().length === 0 ? 'Kies een teamnaam of tik op een ideetje.' : undefined
	);
	const leeftijdFout = $derived(
		geprobeerd && leeftijd === undefined ? 'Kies een leeftijd.' : undefined
	);

	async function vertrek(event: SubmitEvent) {
		event.preventDefault();
		// currentTarget is na een await niet meer beschikbaar; nu bewaren.
		const form = event.currentTarget as HTMLFormElement;
		geprobeerd = true;

		if (naamFout || leeftijdFout) {
			await tick();
			form.querySelector<HTMLElement>('[aria-invalid="true"], [data-ongeldig]')?.focus();
			return;
		}

		team.naam = naam.trim();
		team.leeftijd = leeftijd;
		goto(resolve('/tocht'));
	}
</script>

<svelte:head>
	<title>Maak jullie team · De gescheurde wan</title>
</svelte:head>

<Scherm onsubmit={vertrek}>
	<SchermKop
		lint="Voor we starten"
		titel="Maak jullie team"
		intro="Jullie teamnaam komt op de stempelkaart. De leeftijd helpt ons om de opdrachten goed uit te leggen."
	/>

	<Vak titel="Teamnaam" icoon="team">
		<div class="stapel">
			<TekstVeld
				bind:value={naam}
				label="Teamnaam"
				name="teamnaam"
				placeholder="Typ jullie teamnaam"
				maxlength={20}
				icoon="pen"
				fout={naamFout}
			/>
			<Suggesties {suggesties} gekozen={naam} onkies={(s) => (naam = s)} />
		</div>
	</Vak>

	<Vak titel="Leeftijd van het kind" kleur="groen" icoon="kind">
		<div class="stapel">
			<KeuzeTegels
				vraag="Hoe oud is het kind dat meespeelt?"
				name="leeftijd"
				keuzes={leeftijden}
				bind:value={leeftijd}
				fout={leeftijdFout}
			/>
			<p class="hulp">Spelen er meerdere kinderen mee? Kies dan de jongste.</p>
		</div>
	</Vak>

	{#snippet actie()}
		<Knop type="submit">Klaar, we vertrekken!</Knop>
	{/snippet}
</Scherm>

<style>
	.stapel {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.hulp {
		color: var(--kleur-grijs);
		font-size: 14px;
		line-height: 1.25;
	}
</style>
