<script lang="ts">
	import lintGroot from '#lib/assets/lint.svg';
	import lintKlein from '#lib/assets/lint-klein.svg';

	interface Props {
		tekst: string;
		/** groot: 170×28 (startscherm), klein: 150×28 (schermkop). */
		variant?: 'groot' | 'klein';
	}

	let { tekst, variant = 'groot' }: Props = $props();

	const varianten = {
		groot: { src: lintGroot, breedte: 170 },
		klein: { src: lintKlein, breedte: 150 }
	};

	const lint = $derived(varianten[variant]);
</script>

<span class="lint {variant}">
	<img src={lint.src} alt="" width={lint.breedte} height="28" />
	<span class="tekst">{tekst}</span>
</span>

<style>
	/* Het lint rekt mee met de tekst; de SVG heeft preserveAspectRatio="none". */
	.lint {
		position: relative;
		display: inline-flex;
		align-self: center;
		align-items: center;
		min-width: 170px;
		height: 28px;
		padding: 0 23.5px;
	}

	.klein {
		min-width: 150px;
		padding: 0 12px;
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

	.klein .tekst {
		font-size: 11px;
		letter-spacing: 1.76px;
		text-indent: 1.76px;
	}
</style>
