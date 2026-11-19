<script lang="ts">
	interface Props {
		/** Eén cijfer per stempel; undefined zolang de stempel niet verzameld is. */
		cijfers: (string | undefined)[];
	}

	let { cijfers }: Props = $props();

	const gevonden = $derived(cijfers.filter(Boolean).length);
	const id = $props.id();
</script>

<div class="code">
	<p class="label" id="{id}-label"><span>Code voor</span> <span>de kist</span></p>
	<ol class="cijfers" aria-labelledby="{id}-label" aria-describedby="{id}-stand">
		{#each cijfers as cijfer, i (i)}
			<li class={{ gevonden: cijfer }}>{cijfer ?? '?'}</li>
		{/each}
	</ol>
	<span id="{id}-stand" class="visueel-verborgen">
		{gevonden} van {cijfers.length} cijfers gevonden
	</span>
</div>

<style>
	.code {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border-radius: var(--radius-knop);
		background: var(--kleur-groen-licht);
	}

	.label {
		flex: 1;
		font-family: var(--font-titel);
		font-weight: 800;
		font-size: 11px;
		letter-spacing: 1.54px;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.label span {
		display: block;
		white-space: nowrap;
	}

	.cijfers {
		display: flex;
		gap: 8px;
		margin-left: auto;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 46px;
		border-radius: var(--radius-klein);
		background: var(--kleur-wit);
		color: var(--kleur-grijs);
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 22px;
	}

	li.gevonden {
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}
</style>
