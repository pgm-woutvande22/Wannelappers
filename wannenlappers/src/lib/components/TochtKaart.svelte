<script lang="ts">
	import jijNauwkeurigheid from '#lib/assets/jij-nauwkeurigheid.svg';
	import jijPunt from '#lib/assets/jij-punt.svg';
	import ondergrond from '#lib/assets/kaart-ondergrond.svg';
	import StopMarker from '#lib/components/StopMarker.svelte';
	import { JIJ, KAART, type Stop } from '#lib/data/stops.js';

	interface Props {
		stops: Stop[];
		volgende: Stop;
		/** Stop waarvan het label getoond wordt. */
		gekozen?: number;
		/** Extra info in het label van de volgende stop, bv. de afstand. */
		afstand?: string;
	}

	let { stops, volgende, gekozen = $bindable(), afstand }: Props = $props();

	const toon = $derived(stops.find((s) => s.nr === (gekozen ?? volgende.nr)) ?? volgende);

	const pct = (x: number, y: number) => ({
		x: `${(x / KAART.breedte) * 100}%`,
		y: `${(y / KAART.hoogte) * 100}%`
	});
	const jij = pct(JIJ.x, JIJ.y);
	const label = $derived(pct(toon.x, toon.y));
	const tipTekst = $derived(
		[`Stop ${toon.nr}`, toon.naam, toon.nr === volgende.nr ? afstand : undefined]
			.filter(Boolean)
			.join(' · ')
	);
</script>

<div class="kaart" role="group" aria-label="Kaart van de tocht">
	<div class="canvas">
		<img class="ondergrond" src={ondergrond} alt="" width={KAART.breedte} height={KAART.hoogte} />

		<span class="jij" style:left={jij.x} style:top={jij.y}>
			<img src={jijNauwkeurigheid} alt="" width="52" height="52" />
			<img class="punt" src={jijPunt} alt="" width="20" height="20" />
			<span class="jij-label">Jij bent hier</span>
		</span>

		{#each stops as stop (stop.nr)}
			<StopMarker
				{stop}
				volgende={stop.nr === volgende.nr}
				gekozen={stop.nr === toon.nr}
				onkies={() => (gekozen = stop.nr)}
			/>
		{/each}

		<p
			class={['tip', { volgende: toon.nr === volgende.nr }]}
			style:left={label.x}
			style:top={label.y}
			aria-live="polite"
		>
			{tipTekst}
		</p>
	</div>
</div>

<style>
	.kaart {
		width: 100%;
		/* Onderkant van de kaart is leeg; iets inkorten zodat de stempelkaart in beeld past. */
		aspect-ratio: 345 / 330;
		overflow: hidden;
		border: 1.5px solid var(--kleur-lijn);
		border-radius: 18px;
	}

	.canvas {
		position: relative;
		width: 100%;
		aspect-ratio: 345 / 372;
	}

	.ondergrond {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.jij {
		position: absolute;
		translate: -50% -50%;
		width: 52px;
		height: 52px;
		pointer-events: none;
	}

	.jij img {
		position: absolute;
		inset: 0;
	}

	.jij .punt {
		inset: 16px;
	}

	.jij-label {
		position: absolute;
		left: 40px;
		top: 32px;
		padding: 3px 8px;
		border-radius: 6px;
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 11px;
		white-space: nowrap;
	}

	/* Label boven de gekozen marker. */
	.tip {
		position: absolute;
		translate: -50% calc(-100% - 36px);
		padding: 5px 10px;
		border-radius: 8px;
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 13px;
		white-space: nowrap;
		pointer-events: none;
	}

	.tip.volgende {
		background: var(--kleur-groen-donker);
	}
</style>
