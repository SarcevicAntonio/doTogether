import { db } from '$lib/firebase';
import { notification } from 'as-comps';
import type { Unsubscribe } from 'firebase/auth';
import { onValue, ref, remove as removeDoc, set as setDoc } from 'firebase/database';
import { derived, get } from 'svelte/store';
import { user } from './user';

let unsubscribe: Unsubscribe;

function subscribe(uid: string, set: (value: Record<string, string>) => void) {
	const dbRef = ref(db, 'members/' + uid);
	unsubscribe = onValue(
		dbRef,
		(snapshot) => {
			set(snapshot.val() || []);
		},
		(error) => {
			console.error(error);
			notification('ERROR: ' + error.message, { type: 'warn' });
		}
	);
}

export const keychain = derived<typeof user, Record<string, string> | void>(user, ($user, set) => {
	if (!$user) return;
	if (unsubscribe) unsubscribe();
	subscribe($user.uid, set);
});

export async function add_list_key(id: string, key: string) {
	const $user = get(user);
	if (!$user) return;
	const dbRef = ref(db, 'members/' + $user.uid + '/' + id);
	await setDoc(dbRef, key);
}

export async function remove_list_key(id: string) {
	const $user = get(user);
	if (!$user) return;
	const dbRef = ref(db, 'members/' + $user.uid + '/' + id);
	await removeDoc(dbRef);
}
