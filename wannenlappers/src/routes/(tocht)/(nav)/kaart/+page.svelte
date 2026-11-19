<script lang="ts">
	import { resolve } from '$app/paths';
	import IcoonKnop from '#lib/components/IcoonKnop.svelte';
	import TochtKaart from '#lib/components/TochtKaart.svelte';
	import { alsTitel, stops } from '#lib/data/stops.js';
	import { tocht } from '#lib/state/tocht.svelte.js';

	const volgende = $derived(tocht.volgende);
	const opdrachtHref = $derived(resolve('/(tocht)/stop/[nr]', { nr: String(volgende.nr) }));
	/** "120 m · ± 3 min" -> "120 m" */
	const meters = $derived(volgende.afstand?.split('·')[0].trim());
</script>

<svelte:head>
	<title>Kaart · De gescheurde wan</title>
</svelte:head>

<h1>Kaart</h1>
<p class="intro">Volg de stippellijn naar stop {volgende.nr}</p>

<div class="kaart">
	<TochtKaart {stops} status={(s) => tocht.status(s)} volgendeHref={opdrachtHref}>
		{#snippet onder()}
			<a class="volgende" href={opdrachtHref}>
				<span class="tekst">
					<span class="klein">Stop {volgende.nr}{meters ? ` · ${meters}` : ''}</span>
					<span class="naam">{alsTitel(volgende)}</span>
				</span>
				<IcoonKnop icoon="pijl" label="" kleur="blauw" />
			</a>
		{/snippet}
	</TochtKaart>
</div>

<style>
	h1 {
		font-weight: 500;
		font-size: 32px;
		line-height: 1.12;
		letter-spacing: -0.64px;
	}

	.intro {
		margin-top: 6px;
		color: var(--kleur-subtiel);
		font-size: 16px;
		line-height: 1.35;
	}

	.kaart {
		margin-top: 18px;
	}

	.volgende {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 12px 12px 16px;
		border-radius: 24px;
		background: var(--kleur-wit);
		color: var(--kleur-inkt);
		text-decoration: none;
		transition: background-color var(--overgang);
	}

	.volgende:hover {
		background: var(--kleur-canvas);
	}

	.tekst {
		display: flex;
		flex: 1 0 0;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
		line-height: 1.35;
	}

	.klein {
		color: var(--kleur-subtiel);
		font-size: 13px;
	}

	.naam {
		font-weight: 500;
		font-size: 18px;
	}
</style>
