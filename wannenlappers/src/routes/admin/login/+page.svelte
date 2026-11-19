<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
	let bezig = $state(false);
</script>

<svelte:head>
	<title>Aanmelden · Admin · De gescheurde wan</title>
</svelte:head>

<main class="login">
	<form
		class="paneel"
		method="POST"
		use:enhance={() => {
			bezig = true;
			return async ({ update }) => {
				await update({ reset: false });
				bezig = false;
			};
		}}
	>
		<h1>Admin</h1>
		<p class="intro">Meld je aan om oefeningen, audio en statistieken te beheren.</p>

		<div class="veld">
			<label for="email">E-mailadres</label>
			<input
				id="email"
				name="email"
				type="email"
				autocomplete="username"
				required
				value={form?.email ?? ''}
				aria-invalid={form?.fout ? true : undefined}
				aria-describedby="login-fout"
			/>
		</div>

		<div class="veld">
			<label for="wachtwoord">Wachtwoord</label>
			<input
				id="wachtwoord"
				name="wachtwoord"
				type="password"
				autocomplete="current-password"
				required
				aria-invalid={form?.fout ? true : undefined}
				aria-describedby="login-fout"
			/>
		</div>

		<p id="login-fout" class="melding fout" aria-live="polite" hidden={!form?.fout}>
			{form?.fout ?? ''}
		</p>

		<button class="knop" type="submit" disabled={bezig}>
			{bezig ? 'Bezig…' : 'Aanmelden'}
		</button>
	</form>
</main>

<style>
	.login {
		display: grid;
		place-items: center;
		min-height: 100vh;
		padding: 24px;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: min(400px, 100%);
	}

	.intro {
		color: var(--kleur-grijs);
	}
</style>
