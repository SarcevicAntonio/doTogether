import { auth } from '$lib/firebase';
import { writable } from 'svelte/store';

const { set, subscribe } = writable(null);

auth.onAuthStateChanged((userChanged) => {
	set(userChanged);
});

export const user = { subscribe };
