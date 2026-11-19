// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { User } from '@supabase/supabase-js';
import type { Supabase } from '#lib/server/supabase.js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: Supabase;
			haalGebruiker: () => Promise<User | null>;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
