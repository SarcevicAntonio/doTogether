import { authADMIN } from '$lib/firebase.server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');
	console.log('hook', token);
	if (token) {
		try {
			const decoded = await authADMIN.verifyIdToken(token);
			event.locals.user = await authADMIN.getUser(decoded.uid);
		} catch (e) {
			console.log('token invalid');
			event.locals.user = null;
		}
	}

	const response = await resolve(event);
	return response;
};
