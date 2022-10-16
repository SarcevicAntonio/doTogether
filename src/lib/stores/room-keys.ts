import { db } from '$lib/firebase';
import { onValue, ref, type Unsubscribe } from 'firebase/database';
import { writable } from 'svelte/store';
import { user } from './user';

const { set, subscribe } = writable(null);

let unsubscribe: Unsubscribe = null;
user.subscribe(async ($user) => {
	if (!$user) return;
	if (unsubscribe) {
		unsubscribe();
	}
	const dbRef = ref(db, 'members/' + $user.uid);
	unsubscribe = onValue(
		dbRef,
		(snapshot) => {
			set(snapshot.val() || []);
		},
		(error) => console.log(error)
	);
});

export const room_keys = { subscribe };
