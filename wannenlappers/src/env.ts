import { defineEnvVars } from '@sveltejs/kit/env';

/** Leeg of ontbrekend = undefined, zodat de app ook zonder Supabase start (enkel /admin heeft het nodig). */
const optioneel = (waarde: string | undefined) => waarde?.trim() || undefined;

export const variables = defineEnvVars({
	PUBLIC_SUPABASE_URL: {
		public: true,
		schema: optioneel,
		description: 'URL van het Supabase-project, bv. https://<ref>.supabase.co'
	},
	PUBLIC_SUPABASE_PUBLISHABLE_KEY: {
		public: true,
		schema: optioneel,
		description: 'Publishable (anon) key van Supabase; veilig voor de browser dankzij RLS.'
	}
});
