import { dbADMIN } from '$lib/firebase.server';
import type { Task_List } from '$lib/task_lists';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends('data:user');
	if (!locals.user) {
		return { user: locals.user };
	}

	const ref_keychain = dbADMIN.ref('/members/' + locals.user.id);
	const keychain = await ref_keychain.get().then((d) => d.val());

	const list_promises = [];
	for (const list_id of Object.keys(keychain)) {
		const ref_list = dbADMIN.ref('/lists/' + list_id);
		list_promises.push(ref_list.get().then((d) => ({ id: list_id, ...d.val() } as Task_List)));
	}

	return { user: locals.user, task_list: Promise.all(list_promises) };
};
