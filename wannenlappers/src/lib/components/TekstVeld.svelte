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
		gap: 12px;
	}

	.veld {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		height: 60px;
		padding: 0 16px;
		border: var(--rand-veld) solid var(--kleur-lijn);
		border-radius: var(--radius-veld);
		background: var(--kleur-wit);
		transition: border-color var(--overgang);
	}

	.veld:hover {
		border-color: var(--kleur-grijs);
	}

	.veld:focus-within {
		border-color: var(--kleur-blauw);
		outline: 3px solid var(--kleur-blauw-licht);
		outline-offset: 0;
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
		color: var(--kleur-blauw);
		caret-color: var(--kleur-blauw);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 20px;
	}

	input:focus {
		outline: none;
	}

	/* Rustiger dan echte invoer, zodat het niet lijkt alsof het veld al ingevuld is. */
	input::placeholder {
		color: var(--kleur-grijs);
		font-family: var(--font-tekst);
		font-weight: 400;
		font-size: 17px;
		opacity: 1;
	}

	.teller {
		flex-shrink: 0;
		color: var(--kleur-grijs);
		font-size: 13px;
	}
</style>
