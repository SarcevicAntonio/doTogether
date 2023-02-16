import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends('data:user');
	return { user: locals.user };
};
