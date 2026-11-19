<script lang="ts" module>
	/** Attributen die het invoerveld nodig heeft om aan label, hulp en fout gekoppeld te zijn. */
	export interface VeldAttributen {
		id: string;
		'aria-invalid': true | undefined;
		'aria-describedby': string;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Foutmelding from '#lib/components/Foutmelding.svelte';

	interface Props {
		label: string;
		hulp?: string;
		fout?: string;
		/** Het invoerveld; spreid de attributen erop: `<input {...attr} />`. */
		children: Snippet<[VeldAttributen]>;
	}

	let { label, hulp, fout, children }: Props = $props();

	const id = $props.id();
	const attributen = $derived<VeldAttributen>({
		id,
		'aria-invalid': fout ? true : undefined,
		'aria-describedby': hulp ? `${id}-hulp ${id}-fout` : `${id}-fout`
	});
</script>

<div class="veld">
	<label for={id}>{label}</label>
	{@render children(attributen)}
	{#if hulp}<p id="{id}-hulp" class="hulp">{hulp}</p>{/if}
	<Foutmelding id="{id}-fout" tekst={fout} />
</div>
