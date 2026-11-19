import { vereisAdmin } from '#lib/server/admin.js';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const gebruiker = await vereisAdmin(locals);
	return { email: gebruiker.email ?? '' };
};
