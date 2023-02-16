import { dbADMIN } from '$lib/firebase.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return {};

	const ref_keychain = dbADMIN.ref('/members/' + locals.user.id);
	const keychain = await ref_keychain.get().then((d) => d.val());

	const list_promises = [];
	for (const list_id of Object.keys(keychain)) {
		const ref_list = dbADMIN.ref('/lists/' + list_id);
		list_promises.push(ref_list.get().then((d) => ({ id: list_id, ...d.val() })));
	}

	return { task_list: Promise.all(list_promises) };
};
