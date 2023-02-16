import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { token } = await request.json()
		if (!token) throw new Error()
		cookies.set('token', token, {
			sameSite: true,
			httpOnly: true,
			path: '/'
		})
	} catch {
		cookies.delete('token', {
			sameSite: true,
			httpOnly: true,
			path: '/'
		})
	}

	return new Response()
}
