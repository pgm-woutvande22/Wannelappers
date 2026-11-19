<script lang="ts">
	import Chip from '#lib/components/Chip.svelte';
	import IcoonKnop from '#lib/components/IcoonKnop.svelte';
	import Knop from '#lib/components/Knop.svelte';
	import { alsTitel, type Stop } from '#lib/data/stops.js';

	interface Props {
		stop: Stop;
		/** De stop daarna, voor "Daarna: …". */
		daarna?: Stop;
		/** Aantal stops (zonder vertrekpunt), voor "Stop 2 van 5". */
		totaalStops: number;
		verzameld: number;
		totaalStempels: number;
		opdrachtHref: string;
		kaartHref: string;
	}

	let { stop, daarna, totaalStops, verzameld, totaalStempels, opdrachtHref, kaartHref }: Props =
		$props();
</script>

<!-- Figma v5 "Volgende stop" -->
<section class="kaart" aria-labelledby="volgende-titel">
	<div class="kop">
		<IcoonKnop icoon={stop.icoon} label="" icoonMaat={24} />
		<div class="info">
			<p class="klein">Volgende stop</p>
			{#if stop.afstand}<p class="afstand">{stop.afstand}</p>{/if}
		</div>
		<Chip variant="wit">Stop {stop.nr} van {totaalStops}</Chip>
	</div>

	<h2 id="volgende-titel">{alsTitel(stop)}</h2>

	<div class="voortgang" aria-hidden="true">
		{#each { length: totaalStempels }, i (i)}
			<span class={['deel', { vol: i < verzameld }]}></span>
		{/each}
	</div>

	<div class="stand">
		<p>{verzameld} van {totaalStempels} stempels</p>
		{#if daarna}<p class="daarna">Daarna: {daarna.inZin}</p>{/if}
	</div>

	<div class="acties">
		<Knop href={opdrachtHref} icoon="play">Start de opdracht</Knop>
		<IcoonKnop
			icoon="kaart"
			label="Bekijk de kaart"
			href={kaartHref}
			maat={60}
			icoonMaat={24}
		/>
	</div>
</section>

<style>
	.kaart {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 20px;
		border-radius: 28px;
		background: var(--kleur-groentint);
	}

	.kop {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.info {
		display: flex;
		flex: 1 0 0;
		flex-direction: column;
		gap: 1px;
		min-width: 0;
		line-height: 1.35;
	}

	.klein {
		color: var(--kleur-subtiel);
		font-size: 14px;
	}

	.afstand {
		font-weight: 500;
		font-size: 15px;
	}

	h2 {
		font-weight: 500;
		font-size: 26px;
		line-height: 1.12;
		letter-spacing: -0.52px;
	}

	.voortgang {
		display: flex;
		gap: 6px;
	}

	.deel {
		flex: 1 0 0;
		height: 5px;
		border-radius: 3px;
		background: var(--kleur-voortgang-leeg);
	}

	.deel.vol {
		background: var(--kleur-groen-donker);
	}

	.stand {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		font-size: 14px;
		line-height: 1.35;
	}

	.daarna {
		color: var(--kleur-subtiel);
		text-align: right;
	}

	.acties {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>
