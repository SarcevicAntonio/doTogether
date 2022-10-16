import { db } from '$lib/firebase';
import { onValue, ref, type Unsubscribe } from 'firebase/database';
import { writable } from 'svelte/store';
import { room_keys } from './room-keys';

const { update, subscribe } = writable(new Map());

const unsubs = new Map<string, Unsubscribe>();

room_keys.subscribe(async ($room_keys) => {
	if (!$room_keys) return;
	for (const room_id of Object.keys($room_keys)) {
		const oldUnsub = unsubs.get(room_id);
		if (oldUnsub) return;

		const dbRef = ref(db, 'rooms/' + room_id);
		const freshUnsub = onValue(
			dbRef,
			(snapshot) => {
				update((map) => map.set(room_id, snapshot.val()));
			},
			(error) => {
				console.error(error);
				// TODO: delete id:key pair from member if wrong.
			}
		);
		unsubs.set(room_id, freshUnsub);
	}
});

export const rooms = { subscribe };
