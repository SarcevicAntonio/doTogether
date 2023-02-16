import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { token } = await request.json();
		if (token) {
			cookies.set('token', token);
		}
	} catch {
		cookies.delete('token');
	}
	return new Response();
};
