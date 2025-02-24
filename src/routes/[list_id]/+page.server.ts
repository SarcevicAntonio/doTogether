import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ cookies, params, parent }) => {
	const data = await parent()
	const current_list = data.task_list?.find((l) => l.id === params.list_id)

	if (!current_list) {
		cookies.delete('last_list_id', { path: '/' })
		redirect(303, '/');
	}

	cookies.set('last_list_id', params.list_id, {
		sameSite: true,
		httpOnly: true,
		path: '/'
	})

	return {
		current_list
	}
}
