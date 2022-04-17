import { writable } from 'svelte/store';

// connect realtime database
export const items = writable([
	{ label: 'Hallo', id: 0, days: 7, remaining: 1 },
	{ label: 'Hallo', id: 1, days: 7, remaining: -10 }
]);
