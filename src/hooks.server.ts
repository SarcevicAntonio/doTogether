import { server_auth } from '$lib/firebase.server'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session')

	if (!session) {
		const response = await resolve(event)
		return response
	}

	try {
		const decoded = await server_auth.verifySessionCookie(session)
		const { uid, displayName, email, photoURL } = await server_auth.getUser(decoded.uid)
		event.locals.user = {
			id: uid,
			name: displayName,
			email,
			photo: photoURL
		}
	} catch (e) {
		console.error(e)
		event.locals.user = null
	}

	const response = await resolve(event)
	return response
}
