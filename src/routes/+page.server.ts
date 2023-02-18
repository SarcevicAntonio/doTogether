import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { task_list } = await parent()
	if (!task_list) return {}
	throw redirect(302, '/' + task_list[0].id)
}
