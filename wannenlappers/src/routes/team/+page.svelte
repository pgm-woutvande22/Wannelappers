<script lang="ts">
	import { tick } from 'svelte';
	import { deserialize } from '$app/forms';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Icoon from '#lib/components/Icoon.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import LeeftijdenKiezer, { type Kind } from '#lib/components/LeeftijdenKiezer.svelte';
	import Scherm from '#lib/components/Scherm.svelte';
	import SchermKop from '#lib/components/SchermKop.svelte';
	import Suggesties from '#lib/components/Suggesties.svelte';
	import TekstVeld from '#lib/components/TekstVeld.svelte';
	import { team } from '#lib/state/team.svelte.js';
	import { tocht } from '#lib/state/tocht.svelte.js';

	const suggesties = ['De Knotkoppen', 'Team Wan', 'De Wissenwevers'];

	let naam = $state(team.naam);
	let kinderen = $state<Kind[]>(
		team.leeftijden.length
			? team.leeftijden.map((leeftijd, i) => ({ id: i + 1, leeftijd }))
			: [{ id: 1 }]
	);
	/** Fouten pas tonen nadat iemand één keer op de knop drukte. */
	let geprobeerd = $state(false);
	let bezig = $state(false);

	const naamFout = $derived(
		geprobeerd && naam.trim().length === 0 ? 'Kies een teamnaam of tik op een ideetje.' : undefined
	);
	const leeftijdFout = $derived(
		geprobeerd && kinderen.some((k) => k.leeftijd === undefined)
			? 'Kies voor elk kind een leeftijd.'
			: undefined
	);

	async function vertrek(event: SubmitEvent) {
		event.preventDefault();
		if (bezig) return;
		// currentTarget is na een await niet meer beschikbaar; nu bewaren.
		const form = event.currentTarget as HTMLFormElement;
		geprobeerd = true;

		if (naamFout || leeftijdFout) {
			await tick();
			form.querySelector<HTMLElement>('[aria-invalid="true"], [data-ongeldig]')?.focus();
			return;
		}

		const leeftijden = kinderen.map((k) => k.leeftijd).filter((l) => l !== undefined);
		team.naam = naam.trim();
		team.leeftijden = leeftijden;

		bezig = true;
		tocht.id = await registreer(leeftijden);
		tocht.afgemeld = false;
		bezig = false;

		goto(resolve('/(tocht)/kaart'));
	}

	/**
	 * Stuurt enkel de leeftijden naar de form action (geen teamnaam).
	 * Lukt het niet, dan gaat de tocht gewoon door zonder statistieken.
	 */
	async function registreer(leeftijden: number[]): Promise<string | null> {
		const body = new FormData();
		for (const l of leeftijden) body.append('leeftijd', String(l));

		try {
			const response = await fetch(resolve('/team'), {
				method: 'POST',
				body,
				headers: { 'x-sveltekit-action': 'true' }
			});
			const result = deserialize<{ tochtId: string | null }, { fout: string }>(
				await response.text()
			);
			return result.type === 'success' ? (result.data?.tochtId ?? null) : null;
		} catch {
			return null;
		}
	}
</script>

<svelte:head>
	<title>Maak jullie team · De gescheurde wan</title>
</svelte:head>

<Scherm onsubmit={vertrek}>
	<SchermKop
		label="Voor we starten"
		titel="Maak jullie team"
		intro="Jullie naam komt op de stempelkaart. De leeftijden gebruiken we om de opdrachten goed uit te leggen."
	/>

	<div class="groep">
		<TekstVeld
			bind:value={naam}
			label="Teamnaam"
			name="teamnaam"
			placeholder="Typ jullie teamnaam"
			maxlength={20}
			icoon="pen"
			fout={naamFout}
		>
			{#snippet onder()}
				<Suggesties {suggesties} gekozen={naam} onkies={(s) => (naam = s)} />
			{/snippet}
		</TekstVeld>
	</div>

	<div class="groep">
		<LeeftijdenKiezer
			bind:kinderen
			name="leeftijd"
			fout={leeftijdFout}
			hulp="Bij jonge kinderen leest Wannes alles voor."
		/>
	</div>

	{#snippet actie()}
		<p class="privacy">
			<Icoon naam="slot" maat={16} />
			Jullie teamnaam bewaren we niet. De leeftijden en de duur van de tocht bewaren we anoniem, om
			de tocht te verbeteren.
		</p>
		<Knop type="submit" disabled={bezig}>
			{bezig ? 'Even geduld…' : 'Klaar, we vertrekken!'}
		</Knop>
	{/snippet}
</Scherm>

<style>
	.groep {
		padding-top: 12px;
	}

	.privacy {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		margin-bottom: 12px;
		color: var(--kleur-grijs);
		font-size: 14px;
		line-height: 1.25;
	}
</style>
