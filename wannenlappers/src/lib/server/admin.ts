import { redirect } from '@sveltejs/kit';

/**
 * Stuurt naar de loginpagina als niemand is aangemeld.
 * Gebruik dit in elke load én action: een layout-load beschermt geen actions.
 * (RLS in Supabase blokkeert schrijfacties van niet-aangemelde gebruikers sowieso.)
 */
export async function vereisAdmin(locals: App.Locals) {
	const gebruiker = await locals.haalGebruiker();
	if (!gebruiker) redirect(303, '/admin/login');
	return gebruiker;
}
