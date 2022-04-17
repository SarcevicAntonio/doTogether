import { db } from '$lib/firebase';
import type { RequestHandler } from '@sveltejs/kit';
import { get as getFire, ref, set } from 'firebase/database';

export const get: RequestHandler = async ({ request }) => {
	const key = import.meta.env.VITE_CRON_KEY;
	console.log('key: ', JSON.stringify(key, null, 2));
	console.log('request.headers: ', JSON.stringify(request.headers, null, 2));
	const reqKey = request.headers.get('Authorization')?.split(' ')[1];
	console.log('reqKey: ', JSON.stringify(reqKey, null, 2));
	if (reqKey === key) {
		console.log('true');

		const dbRef = ref(db, 'todos');
		const items = (await getFire(dbRef)).val();

		console.log('items: ', JSON.stringify(items, null, 2));

		items.forEach((item) => {
			item.remaining--;

			console.log('item: ', JSON.stringify(item, null, 2));
		});

		set(dbRef, items);

		console.log('items: ', JSON.stringify(items, null, 2));
	} else {
		console.log('false');
	}
	return { status: 200 };
};
