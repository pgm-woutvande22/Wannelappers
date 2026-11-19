<script lang="ts">
	interface Props {
		/** Eén cijfer per stempel; undefined zolang de stempel niet verzameld is. */
		cijfers: (string | undefined)[];
		/**
		 * 'los': vaste vakjes van 64×72 (Gestempeld-scherm).
		 * 'vol': vakjes die de breedte vullen (Schatkist-kaart op Stempels).
		 */
		maat?: 'los' | 'vol';
		/** Toegankelijke naam van de rij. */
		label?: string;
	}

	let { cijfers, maat = 'los', label = 'Code voor de schatkist' }: Props = $props();

	const gevonden = $derived(cijfers.filter(Boolean).length);
</script>

<ol class="code {maat}" aria-label="{label}: {gevonden} van {cijfers.length} cijfers gevonden">
	{#each cijfers as cijfer, i (i)}
		<li class={{ gevonden: cijfer }}>
			{#if cijfer}{cijfer}{:else}<span aria-hidden="true">–</span><span class="visueel-verborgen"
					>nog niet gevonden</span
				>{/if}
		</li>
	{/each}
</ol>

<style>
	.code {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--kleur-wit);
		color: var(--kleur-subtiel);
		font-family: var(--font-basis);
		font-weight: 500;
		line-height: 1.12;
	}

	li.gevonden {
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	.los {
		gap: 10px;
	}

	.los li {
		width: 64px;
		height: 72px;
		border-radius: 20px;
		font-size: 28px;
		letter-spacing: -0.56px;
	}

	.vol {
		gap: 8px;
		width: 100%;
	}

	.vol li {
		flex: 1 0 0;
		min-width: 0;
		height: 60px;
		border-radius: 18px;
		font-size: 24px;
		letter-spacing: -0.48px;
	}
</style>
