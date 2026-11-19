<script lang="ts">
	import AudioSpeler from '#lib/components/AudioSpeler.svelte';
	import { alineas } from '#lib/utils/oefeningFormulier.js';

	interface Props {
		titel: string;
		tekst: string;
		audioUrl: string | null;
		fotos: { id: string; url: string; beschrijving: string }[];
	}

	let { titel, tekst, audioUrl, fotos }: Props = $props();
</script>

<article class="oefening">
	<header>
		<h2>{titel}</h2>
		{#if audioUrl}
			<AudioSpeler src={audioUrl} onderwerp={titel} />
		{/if}
	</header>

	{#each fotos as foto (foto.id)}
		<img src={foto.url} alt={foto.beschrijving} loading="lazy" />
	{/each}

	{#each alineas(tekst) as alinea, i (i)}
		<p>{alinea}</p>
	{/each}
</article>

<style>
	.oefening {
		display: flex;
		flex-direction: column;
		gap: 12px;
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

	h2 {
		font-family: var(--font-titel);
		font-weight: 900;
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

	p {
		font-size: 17px;
		line-height: 1.4;
		white-space: pre-line;
	}
</style>
