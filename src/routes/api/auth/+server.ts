import { server_auth } from '$lib/firebase.server'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { token } = await request.json()

		const session_cookie = await server_auth.createSessionCookie(token, {
			expiresIn: 1000 * 60 * 60 * 24 * 5 /* 5 days in ms */
		})

		if (!token) throw new Error()
		cookies.set('session', session_cookie, {
			sameSite: true,
			httpOnly: true,
			path: '/'
		})
	} catch {
		cookies.delete('session', {
			sameSite: true,
			httpOnly: true,
			path: '/'
		})
	}

	return new Response()
}
