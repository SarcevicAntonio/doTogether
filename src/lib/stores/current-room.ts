import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import { rooms } from './rooms';

const LS_KEY = 'current_room';

const { set: storeSet, subscribe } = writable(browser ? localStorage.getItem(LS_KEY) : null);

function set(val: string) {
	localStorage.setItem(LS_KEY, val);
	storeSet(val);
}

rooms.subscribe((rooms) => {
	if (rooms.size === 0) return;
	if (rooms.get(get({ subscribe }))) return;
	set(rooms.entries().next().value[0]);
});

export const current_room = { subscribe, set };
