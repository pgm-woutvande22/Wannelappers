<script lang="ts">
	interface Props {
		/** Eén cijfer per stempel; undefined zolang de stempel niet verzameld is. */
		cijfers: (string | undefined)[];
	}

	let { cijfers }: Props = $props();

	const gevonden = $derived(cijfers.filter(Boolean).length);
</script>

<div class="code">
	<p class="label" id="kistcode-label">Code voor de kist</p>
	<ol class="cijfers" aria-labelledby="kistcode-label" aria-describedby="kistcode-stand">
		{#each cijfers as cijfer, i (i)}
			<li class={{ gevonden: cijfer }}>{cijfer ?? '?'}</li>
		{/each}
	</ol>
	<span id="kistcode-stand" class="visueel-verborgen">
		{gevonden} van {cijfers.length} cijfers gevonden
	</span>
</div>

<style>
	.code {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border-radius: var(--radius-klein);
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

	.cijfers {
		display: flex;
		gap: 6px;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 44px;
		border-radius: 10px;
		background: var(--kleur-wit);
		color: var(--kleur-grijs);
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 22px;
	}

	li.gevonden {
		color: var(--kleur-groen-donker);
	}

	.visueel-verborgen {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
