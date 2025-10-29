import { server_db } from '$lib/firebase.server'
import type { Task_List } from '$lib/task_lists'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends('data:user')
	if (!locals.user) {
		return { user: locals.user }
	}
	const keychain_ref = server_db.ref('/members/' + locals.user.id)
	const keychain = (await keychain_ref.get().then((d) => d.val() as Record<string, string>)) || {}
	const list_promises = []
	for (const list_id of Object.keys(keychain)) {
		const list_ref = server_db.ref('/lists/' + list_id)
		list_promises.push(list_ref.get().then((d) => ({ id: list_id, ...d.val() }) as Task_List))
	}
	const all_lists = await Promise.all(list_promises)
	const task_list: Task_List[] = []
	for (const list of all_lists) {
		if (list.key === keychain[list.id]) {
			task_list.push(list)
		} else {
			delete keychain[list.id]
			keychain_ref.set(keychain)
		}
	}
	return { user: locals.user, task_list }
}
