import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const LS_KEY = 'current_room';

const { set: storeSet, subscribe } = writable(browser ? localStorage.getItem(LS_KEY) : null);

function set(val: string) {
	localStorage.setItem(LS_KEY, val);
	storeSet(val);
}

export const current_room = { subscribe, set };
