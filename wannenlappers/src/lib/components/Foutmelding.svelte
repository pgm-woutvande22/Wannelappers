<script lang="ts">
	interface Props {
		id: string;
		tekst?: string;
	}

	let { id, tekst }: Props = $props();
</script>

<!-- Altijd in de DOM zodat schermlezers de wijziging aankondigen. -->
<p {id} class="fout" aria-live="polite">{tekst ?? ''}</p>

<style>
	.fout {
		color: var(--kleur-fout);
		font-size: 14px;
		font-weight: 700;
		line-height: 1.25;
	}

	.fout:empty {
		display: none;
	}
</style>
