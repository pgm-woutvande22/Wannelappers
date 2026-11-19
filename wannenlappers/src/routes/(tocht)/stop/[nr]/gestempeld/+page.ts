import { error } from '@sveltejs/kit';
import { stops } from '#lib/data/stops.js';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const stop = stops.find((s) => String(s.nr) === params.nr && s.stempel);
	if (!stop) error(404, 'Bij deze stop hoort geen stempel');
	return { stop };
};
