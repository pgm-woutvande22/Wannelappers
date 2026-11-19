<script lang="ts">
	import { iconen, type IcoonNaam } from '#lib/utils/iconen.js';

	interface Props {
		naam: IcoonNaam;
	}

	let { naam }: Props = $props();

	const icoon = $derived(iconen[naam]);
</script>

<span class="icoon" style:--vak="{icoon.vak}px" aria-hidden="true">
	<img
		src={icoon.src}
		alt=""
		width={icoon.breedte}
		height={icoon.hoogte}
		style:left="{icoon.links}px"
		style:top="{icoon.boven}px"
	/>
</span>

<style>
	.icoon {
		position: relative;
		display: inline-block;
		flex-shrink: 0;
		width: var(--vak);
		height: var(--vak);
	}

	img {
		position: absolute;
	}
</style>
