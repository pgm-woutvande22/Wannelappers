<script lang="ts">
	import Luisterknop from '#lib/components/Luisterknop.svelte';

	interface Props {
		src: string;
		/** Waarnaar je luistert, bv. "het bericht van Wannes". */
		onderwerp: string;
		/** Duur in seconden, zodra die bekend is (met preload="metadata"). */
		duur?: number;
		/** "metadata" laadt enkel de duur vooraf; "none" laadt pas bij de eerste klik. */
		preload?: 'none' | 'metadata';
	}

	let { src, onderwerp, duur = $bindable(), preload = 'none' }: Props = $props();

	let gepauzeerd = $state(true);
</script>

<audio {src} {preload} bind:paused={gepauzeerd} bind:duration={duur}></audio>
<Luisterknop
	label={gepauzeerd ? 'Luister' : 'Pauze'}
	uitleg={gepauzeerd ? `Luister naar ${onderwerp}` : `Pauzeer ${onderwerp}`}
	onclick={() => (gepauzeerd = !gepauzeerd)}
/>
