<script lang="ts">
	import lint from '#lib/assets/lint.svg';

	interface Props {
		tekst: string;
	}

	let { tekst }: Props = $props();
</script>

<span class="lint">
	<img src={lint} alt="" width="170" height="28" />
	<span class="tekst">{tekst}</span>
</span>

<style>
	/* Het lint rekt mee met de tekst; de SVG heeft preserveAspectRatio="none". */
	.lint {
		position: relative;
		display: inline-flex;
		align-items: center;
		min-width: 170px;
		height: 28px;
		padding: 0 23.5px;
	}

	img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.tekst {
		position: relative;
		margin: 0 auto;
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 12px;
		letter-spacing: 2.4px;
		/* Compenseert de letterafstand na de laatste letter, zodat de tekst exact centreert. */
		text-indent: 2.4px;
		text-transform: uppercase;
		color: var(--kleur-wit);
		white-space: nowrap;
	}
</style>
