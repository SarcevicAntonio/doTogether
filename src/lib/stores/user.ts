import { auth } from '$lib/firebase';
import { writable } from 'svelte/store';

const store = writable(null);

auth.onAuthStateChanged((userChanged) => {
	store.set(userChanged);
});

export const user = { subscribe: store.subscribe };
