<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const links = [
		{ label: 'Overzicht', href: resolve('/admin/(beveiligd)') },
		{ label: 'Oefeningen', href: resolve('/admin/(beveiligd)/oefeningen') },
		{ label: 'Audio', href: resolve('/admin/(beveiligd)/audio') }
	];

	function actief(href: string) {
		const pad = page.url.pathname;
		return href === resolve('/admin/(beveiligd)') ? pad === href : pad.startsWith(href);
	}
</script>

<div class="shell">
	<aside>
		<p class="merk">De gescheurde wan<span>Admin</span></p>
		<nav aria-label="Admin">
			<ul>
				{#each links as link (link.href)}
					<li>
						<a href={link.href} aria-current={actief(link.href) ? 'page' : undefined}>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="gebruiker">
			<p>{data.email}</p>
			<form method="POST" action={resolve('/admin/uitloggen')}>
				<button class="knop secundair" type="submit">Afmelden</button>
			</form>
		</div>
	</aside>

	<main>
		{@render children()}
	</main>
</div>

<style>
	.shell {
		display: grid;
		grid-template-columns: var(--admin-zijbalk) 1fr;
		min-height: 100vh;
	}

	aside {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		gap: 24px;
		height: 100vh;
		padding: 24px 16px;
		background: var(--kleur-blauw);
		color: var(--kleur-wit);
	}

	.merk {
		display: flex;
		flex-direction: column;
		padding: 0 12px;
		font-family: var(--font-titel);
		font-weight: 900;
		font-size: 18px;
	}

	.merk span {
		opacity: 0.7;
		font-weight: 700;
		font-size: 13px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 0;
		list-style: none;
	}

	nav a {
		display: block;
		padding: 10px 12px;
		border-radius: var(--radius-klein);
		color: var(--kleur-wit);
		font-family: var(--font-titel);
		font-weight: 800;
		text-decoration: none;
		transition: background-color var(--overgang);
	}

	nav a:hover {
		background: rgb(255 255 255 / 0.1);
	}

	nav a[aria-current='page'] {
		background: var(--kleur-wit);
		color: var(--kleur-blauw);
	}

	nav a:focus-visible {
		outline-color: var(--kleur-wit);
	}

	.gebruiker {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: auto;
		padding: 0 12px;
		font-size: 13px;
		overflow-wrap: anywhere;
	}

	main {
		min-width: 0;
		padding: var(--admin-ruimte);
	}
</style>
