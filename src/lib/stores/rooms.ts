import { db } from '$lib/firebase';
import { onValue, ref, remove, type Unsubscribe } from 'firebase/database';
import { writable } from 'svelte/store';
import { keychain } from './keychain';

const { update, subscribe } = writable(new Map());

const unsubs = new Map<string, Unsubscribe>();

keychain.subscribe(async ($keychain) => {
	if (!$keychain) return;
	for (const room_id of Object.keys($keychain)) {
		const oldUnsub = unsubs.get(room_id);
		if (oldUnsub) continue;

		const dbRef = ref(db, 'rooms/' + room_id);
		const freshUnsub = onValue(
			dbRef,
			(snapshot) => {
				update((map) => map.set(room_id, snapshot.val()));
			},
			(error) => {
				if (error.message.includes('permission_denied at /rooms/')) {
					// permission lost or room deleted
					keychain.remove(room_id);
					update((map) => {
						map.delete(room_id);
						return map;
					});
				} else {
					console.error(error);
				}
			}
		);
		unsubs.set(room_id, freshUnsub);
	}
});

export const rooms = { subscribe };

// TODO cleanup functions to make files more similar
export async function delete_room(id) {
	const dbRef = ref(db, 'rooms/' + id);
	await remove(dbRef);
}
