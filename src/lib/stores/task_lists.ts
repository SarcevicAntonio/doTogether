import { db } from '$lib/firebase';
import type { Task } from '$lib/task';
import { onValue, ref, remove, type Unsubscribe } from 'firebase/database';
import { writable } from 'svelte/store';
import { add_list_key, keychain, remove_list_key } from './keychain';

export interface Task_List {
	key: string;
	label: string;
	tasks: Task[];
}

const { update, subscribe } = writable<Map<string, Task_List>>(new Map());

export const task_list_map = { subscribe };

const unsubs = new Map<string, Unsubscribe>();

keychain.subscribe(async ($keychain) => {
	if (!$keychain) return;
	for (const list_id of Object.keys($keychain)) {
		const oldUnsub = unsubs.get(list_id);
		if (oldUnsub) continue;

		const dbRef = ref(db, 'lists/' + list_id);
		const freshUnsub = onValue(
			dbRef,
			(snapshot) => {
				update((map) => map.set(list_id, snapshot.val()));
			},
			(error) => {
				if (error.message.includes('permission_denied at /lists/')) {
					// permission lost or list deleted
					remove_list_key(list_id);
					update((map) => {
						map.delete(list_id);
						return map;
					});
				} else {
					console.error(error);
				}
			}
		);
		unsubs.set(list_id, freshUnsub);
	}
});

export async function delete_list(id: string): Promise<void> {
	const dbRef = ref(db, 'lists/' + id);
	await remove(dbRef);
}

export async function create_list(label: string) {
	const { list, id } = await fetch('/api/new_list', {
		method: 'POST',
		body: JSON.stringify({
			label
		})
	}).then((res) => res.json());
	await add_list_key(id, list.key);
	return { list, id };
}
