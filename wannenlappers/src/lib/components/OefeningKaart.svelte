<script lang="ts">
	import AudioSpeler from '#lib/components/AudioSpeler.svelte';
	import OpdrachtStappen from '#lib/components/OpdrachtStappen.svelte';
	import { alineas } from '#lib/utils/oefeningFormulier.js';

	interface Props {
		titel: string;
		/** false als de titel al groot boven het scherm staat. */
		toonTitel?: boolean;
		tekst: string;
		stappen: string[];
		audioUrl: string | null;
		fotos: { id: string; url: string; beschrijving: string }[];
	}

	let { titel, toonTitel = true, tekst, stappen, audioUrl, fotos }: Props = $props();
</script>

<article class="oefening" aria-label={toonTitel ? undefined : titel}>
	{#if toonTitel || audioUrl}
		<header class={{ alleenAudio: !toonTitel }}>
			{#if toonTitel}<h2>{titel}</h2>{/if}
			{#if audioUrl}
				<AudioSpeler src={audioUrl} onderwerp={titel} />
			{/if}
		</header>
	{/if}

	{#each fotos as foto (foto.id)}
		<img src={foto.url} alt={foto.beschrijving} loading="lazy" />
	{/each}

	{#each alineas(tekst) as alinea, i (i)}
		<p>{alinea}</p>
	{/each}

	{#if stappen.length}
		<OpdrachtStappen {stappen} />
	{/if}
</article>

<style>
	.oefening {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		border-radius: var(--radius-kaart);
		background: var(--kleur-groen-licht);
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	header.alleenAudio {
		justify-content: flex-start;
	}

	h2 {
		font-weight: 500;
		font-size: 20px;
		line-height: 1.2;
	}

	img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: var(--radius-veld);
		object-fit: cover;
		background: var(--kleur-wit);
	}

	/* Groot genoeg om buiten in de zon te lezen. */
	p {
		font-size: 18px;
		line-height: 1.4;
		white-space: pre-line;
	}
</style>
