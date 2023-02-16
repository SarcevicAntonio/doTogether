import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return { user: JSON.parse(JSON.stringify(locals.user)) };
};
