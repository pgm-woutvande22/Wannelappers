<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import IcoonKnop from '#lib/components/IcoonKnop.svelte';
	import KistCode from '#lib/components/KistCode.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import Stempel from '#lib/components/Stempel.svelte';
	import { tocht } from '#lib/state/tocht.svelte.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const stop = $derived(data.stop);
	const nogTeGaan = $derived(tocht.totaal - tocht.aantal);
	const cijfers = $derived(
		tocht.stempelStops.map((s) => (tocht.verzameld.has(s.nr) ? s.cijfer : undefined))
	);
	const volgende = $derived(tocht.volgende);

	// De voortgang leeft enkel in de browser: na herladen is de stempel weg, terug naar de opdracht.
	$effect(() => {
		if (!tocht.verzameld.has(stop.nr)) {
			goto(resolve('/(tocht)/stop/[nr]', { nr: String(stop.nr) }), { replaceState: true });
		}
	});
</script>

<svelte:head>
	<title>Gestempeld · {stop.naam} · De gescheurde wan</title>
</svelte:head>

<div class="scherm">
	<div class="top">
		<IcoonKnop
			icoon="sluit"
			icoonMaat={20}
			label="Sluiten"
			href={resolve('/(tocht)/(nav)/onderweg')}
		/>
	</div>

	<div class="stempelvlak">
		<div class="valt">
			<Stempel {stop} maat={210} draai={9} />
		</div>
	</div>

	<h1>Gestempeld.</h1>
	<p class="uitleg" role="status">
		{#if stop.cijfer}Cijfer {stop.cijfer} is van jullie.{/if}
		{tocht.kistOpen
			? 'Alle stempels! De schatkist mag open.'
			: `Nog ${nogTeGaan} ${nogTeGaan === 1 ? 'stempel' : 'stempels'} tot de schatkist.`}
	</p>

	<div class="code">
		<KistCode {cijfers} />
	</div>

	<div class="actie">
		<Knop href={resolve('/(tocht)/(nav)/kaart')}>
			{tocht.kistOpen ? 'Op naar de schatkist' : `Op naar ${volgende.inZin}`}
		</Knop>
	</div>
</div>

<style>
	.scherm {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100dvh;
		padding: calc(16px + env(safe-area-inset-top)) 24px calc(34px + env(safe-area-inset-bottom));
		background: var(--kleur-groentint);
		text-align: center;
	}

	.top {
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}

	.stempelvlak {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 280px;
	}

	/* Figma 5 -> 6: de stempel komt groter en schuiner van boven en drukt zich neer. */
	.valt {
		animation: stempelen 650ms cubic-bezier(0.3, 1.4, 0.5, 1) both;
	}

	h1 {
		font-weight: 500;
		font-size: 36px;
		line-height: 1.12;
		letter-spacing: -0.72px;
		animation: verschijn 300ms 500ms ease-out both;
	}

	@keyframes stempelen {
		from {
			opacity: 0;
			transform: translate(-22px, -248px) scale(1.18) rotate(19deg);
		}
		60% {
			opacity: 1;
		}
	}

	@keyframes verschijn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.valt,
		h1 {
			animation: none;
		}
	}

	.uitleg {
		margin-top: 10px;
		color: var(--kleur-subtiel);
		font-size: 17px;
		line-height: 1.35;
	}

	.code {
		margin-top: 28px;
	}

	.actie {
		width: 100%;
		margin-top: auto;
		padding-top: 24px;
	}
</style>
