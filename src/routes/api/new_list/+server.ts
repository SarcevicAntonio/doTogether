import { server_db } from '$lib/firebase.server'
import { redirect, type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) return redirect(401, '/profile')
	const { label } = await request.json()
	const id = crypto.randomUUID()
	const key = crypto.randomUUID()
	const list = { label, key }
	const list_ref = server_db.ref('/lists/' + id)
	await list_ref.set(list)
	const keychain_ref = server_db.ref('/members/' + locals.user.id)
	const keychain = (await keychain_ref.get().then((d) => d.val() as Record<string, string>)) || {}
	keychain[id] = key
	await keychain_ref.set(keychain)
	return new Response(JSON.stringify({ list, id }))
}
