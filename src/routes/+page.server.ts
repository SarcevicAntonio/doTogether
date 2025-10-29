import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent, cookies }) => {
	const { task_list } = await parent()
	if (!task_list) return {}
	redirect(302, '/' + (cookies.get('last_list_id') || task_list[0]?.id || ''))
}
