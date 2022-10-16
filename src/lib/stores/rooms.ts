import { db } from '$lib/firebase';
import { onValue, ref } from 'firebase/database';
import { get, writable } from 'svelte/store';
import { room_keys } from './room-keys';

const store = writable(new Map());

const unsubs = new Map();

room_keys.subscribe(async ($room_keys) => {
	if (!$room_keys) return;
	console.log($room_keys);
	for (const room_id of Object.keys($room_keys)) {
		const unsub = unsubs.get(room_id);
		if (unsub) unsub();

		const dbRef = ref(db, 'rooms/' + room_id);
		const freshUnsub = onValue(
			dbRef,
			(snapshot) => {
				store.update((map) => {
					return map.set(room_id, snapshot.val());
				});
			},
			(error) => console.log(error)
		);
		unsubs.set(room_id, freshUnsub);
	}
	console.log(get(store));
});

export const rooms = { subscribe: store.subscribe };
