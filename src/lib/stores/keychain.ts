import { db } from '$lib/firebase';
import { notification } from 'as-comps';
import {
	onValue,
	ref,
	remove as removeDoc,
	set as setDoc,
	type Unsubscribe
} from 'firebase/database';
import { get, writable } from 'svelte/store';
import { user } from './user';

const { set, subscribe } = writable(null); // TODO: initial value

let unsubscribe: Unsubscribe = null;
user.subscribe(async ($user) => {
	if (!$user) return;
	if (unsubscribe) return;
	const dbRef = ref(db, 'members/' + $user.uid);
	unsubscribe = onValue(
		dbRef,
		(snapshot) => {
			set(snapshot.val() || []);
		},
		(error) => {
			console.error(error);
			notification('You are trying to access a different users room keys.', { type: 'warn' });
		}
	);
});

async function add(id, key) {
	const dbRef = ref(db, 'members/' + get(user).uid + '/' + id);
	await setDoc(dbRef, key);
}

async function remove(id) {
	const dbRef = ref(db, 'members/' + get(user).uid + '/' + id);
	await removeDoc(dbRef);
}

export const keychain = { subscribe, add, remove };
