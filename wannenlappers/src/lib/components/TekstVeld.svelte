<script lang="ts">
	import type { Snippet } from 'svelte';
	import Foutmelding from '#lib/components/Foutmelding.svelte';
	import Icoon from '#lib/components/Icoon.svelte';
	import type { IcoonNaam } from '#lib/utils/iconen.js';

	interface Props {
		value?: string;
		label: string;
		name?: string;
		placeholder?: string;
		maxlength?: number;
		icoon?: IcoonNaam;
		/** Foutboodschap; zet het veld in fouttoestand. */
		fout?: string;
		/** Extra inhoud onder het veld, bv. suggesties. */
		onder?: Snippet;
	}

	let {
		value = $bindable(''),
		label,
		name,
		placeholder,
		maxlength,
		icoon,
		fout,
		onder
	}: Props = $props();

	const id = $props.id();
</script>

<div class="wrapper">
	<label class="veldlabel" for={id}>{label}</label>
	<div class={['veld', { fout }]}>
		{#if icoon}
			<Icoon naam={icoon} maat={20} />
		{/if}
		<input
			{id}
			{name}
			type="text"
			{placeholder}
			{maxlength}
			autocomplete="off"
			enterkeyhint="done"
			aria-invalid={fout ? true : undefined}
			aria-describedby="{id}-fout"
			bind:value
		/>
		{#if maxlength}
			<span class="teller">{value.length}/{maxlength}</span>
		{/if}
	</div>
	<Foutmelding id="{id}-fout" tekst={fout} />
	{#if onder}{@render onder()}{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	/* Wit veld op het canvas (Figma v5), zoals de cijfervakjes van het codepaneel. */
	.veld {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		height: 60px;
		padding: 0 18px;
		border: 2px solid transparent;
		border-radius: 20px;
		background: var(--kleur-wit);
		color: var(--kleur-inkt);
		transition: border-color var(--overgang);
	}

	.veld:hover {
		border-color: var(--kleur-track);
	}

	.veld:focus-within {
		border-color: var(--kleur-blauw);
		outline: 3px solid var(--kleur-blauwtint);
		outline-offset: 2px;
	}

	.veld.fout {
		border-color: var(--kleur-fout);
		background: var(--kleur-fout-licht);
	}

	input {
		flex: 1;
		min-width: 0;
		padding: 0;
		border: none;
		background: none;
		color: var(--kleur-inkt);
		caret-color: var(--kleur-blauw);
		font-family: var(--font-basis);
		font-weight: 500;
		font-size: 18px;
	}

	input:focus {
		outline: none;
	}

	/* Rustiger dan echte invoer, zodat het niet lijkt alsof het veld al ingevuld is. */
	input::placeholder {
		color: var(--kleur-subtiel);
		font-weight: 400;
		font-size: 17px;
		opacity: 1;
	}

	.teller {
		flex-shrink: 0;
		color: var(--kleur-subtiel);
		font-size: 13px;
	}
</style>
