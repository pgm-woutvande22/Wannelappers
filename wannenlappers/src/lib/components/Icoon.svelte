<script lang="ts">
	import { iconen, type IcoonNaam } from '#lib/utils/iconen.js';

	interface Props {
		naam: IcoonNaam;
		/** Grootte van het icoonvak in px. Zonder maat: de kleinste grootte uit Figma. */
		maat?: number;
	}

	let { naam, maat }: Props = $props();

	/** Exacte grootte uit Figma als die bestaat, anders de dichtstbijzijnde, geschaald. */
	const icoon = $derived.by(() => {
		const varianten = iconen[naam];
		if (maat === undefined) return varianten[0];
		return varianten.reduce((beste, v) =>
			Math.abs(v.vak - maat) < Math.abs(beste.vak - maat) ? v : beste
		);
	});
	const schaal = $derived(maat === undefined ? 1 : maat / icoon.vak);
	const px = (n: number) => `${n * schaal}px`;
</script>

<span class="icoon" style:width={px(icoon.vak)} style:height={px(icoon.vak)} aria-hidden="true">
	<span
		class="vorm"
		style:--src={`url("${icoon.src}")`}
		style:left={px(icoon.links)}
		style:top={px(icoon.boven)}
		style:width={px(icoon.breedte)}
		style:height={px(icoon.hoogte)}
	></span>
</span>

<style>
	.icoon {
		position: relative;
		display: inline-block;
		flex-shrink: 0;
	}

	/* De SVG bepaalt de vorm, currentColor de kleur. */
	.vorm {
		position: absolute;
		background-color: currentColor;
		mask: var(--src) center / 100% 100% no-repeat;
	}
</style>
