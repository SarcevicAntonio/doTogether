import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ cookies, params }) => {
	cookies.set('last_list_id', params.list_id, {
		sameSite: true,
		httpOnly: true,
		path: '/'
	})
}
