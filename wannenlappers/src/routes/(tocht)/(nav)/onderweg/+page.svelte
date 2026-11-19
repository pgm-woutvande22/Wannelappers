<script lang="ts">
	import { resolve } from '$app/paths';
	import AudioSpeler from '#lib/components/AudioSpeler.svelte';
	import IcoonKnop from '#lib/components/IcoonKnop.svelte';
	import StopBalk from '#lib/components/StopBalk.svelte';
	import VolgendeStopKaart from '#lib/components/VolgendeStopKaart.svelte';
	import { stops } from '#lib/data/stops.js';
	import { team } from '#lib/state/team.svelte.js';
	import { tocht } from '#lib/state/tocht.svelte.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const volgende = $derived(tocht.volgende);
	const daarna = $derived(stops[stops.indexOf(volgende) + 1]);
	const nogTeGaan = $derived(tocht.totaal - tocht.aantal);

	/** "De Wilgenwolven" -> "DW" */
	const initialen = $derived(
		team.naam
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((w) => w[0].toUpperCase())
			.join('') || 'W'
	);
</script>

<svelte:head>
	<title>Onderweg · De gescheurde wan</title>
</svelte:head>

<header class="kop">
	<span class="avatar" aria-hidden="true">{initialen}</span>
	<div class="groet">
		<p class="plaats">Wannenlappersbos · Zingem</p>
		<p class="naam">{team.naam ? `Hallo, ${team.naam}` : 'Hallo!'}</p>
	</div>
	{#if data.introUrl}
		<AudioSpeler src={data.introUrl} onderwerp="het bericht van Wannes" variant="icoon" />
	{/if}
</header>

<h1>
	{#if tocht.kistOpen}
		<span>Alle stempels!</span>
		<span>Op naar de schatkist.</span>
	{:else}
		<span>Nog {nogTeGaan} {nogTeGaan === 1 ? 'stempel' : 'stempels'}.</span>
		<span>Op naar {volgende.inZin}.</span>
	{/if}
</h1>

<div class="balk">
	<StopBalk {stops} status={(s) => tocht.status(s)} />
</div>

<VolgendeStopKaart
	stop={volgende}
	{daarna}
	totaalStops={stops.length}
	verzameld={tocht.aantal}
	totaalStempels={tocht.totaal}
	opdrachtHref={resolve('/(tocht)/stop/[nr]', { nr: String(volgende.nr) })}
	kaartHref={resolve('/(tocht)/(nav)/kaart')}
/>

<div class="tegels">
	<section class="tegel blauw" aria-label="Afstand">
		<div class="tegelkop">
			<IcoonKnop icoon="wandel" label="" maat={36} icoonMaat={18} />
			<p>Afstand</p>
		</div>
		<p class="waarde">1,8 km</p>
	</section>
	<section class="tegel" aria-label="Stempels">
		<div class="tegelkop">
			<IcoonKnop icoon="stempel" label="" maat={36} icoonMaat={18} kleur="canvas" />
			<p>Stempels</p>
		</div>
		<p class="waarde">{tocht.aantal} van {tocht.totaal}</p>
	</section>
</div>

<style>
	.kop {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.avatar {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 24px;
		background: var(--kleur-groentint);
		color: var(--kleur-groen-donker);
		font-weight: 600;
		font-size: 16px;
	}

	.groet {
		display: flex;
		flex: 1 0 0;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
		line-height: 1.35;
	}

	.plaats {
		color: var(--kleur-subtiel);
		font-size: 14px;
	}

	.naam {
		overflow: hidden;
		font-weight: 500;
		font-size: 17px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	h1 {
		display: flex;
		flex-direction: column;
		margin-top: 18px;
		font-weight: 500;
		font-size: 32px;
		line-height: 1.12;
		letter-spacing: -0.64px;
	}

	.balk {
		margin: 18px 0 20px;
	}

	.tegels {
		display: flex;
		gap: 12px;
		margin-top: 12px;
	}

	.tegel {
		display: flex;
		flex: 1 0 0;
		flex-direction: column;
		gap: 16px;
		min-width: 0;
		padding: 18px;
		border-radius: 24px;
		background: var(--kleur-wit);
	}

	.tegel.blauw {
		background: var(--kleur-blauwtint);
	}

	.tegelkop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--kleur-subtiel);
		font-size: 14px;
		line-height: 1.35;
	}

	.waarde {
		font-weight: 500;
		font-size: 24px;
		line-height: 1.12;
		letter-spacing: -0.48px;
		white-space: nowrap;
	}
</style>
