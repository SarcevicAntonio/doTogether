import { dbADMIN } from '$lib/firebase-admin';
import type { RequestHandler } from '@sveltejs/kit';

const noCacheHeaders = {
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	Pragma: 'no-cache',
	Expires: 0
};

export const get: RequestHandler = async ({ request }) => {
	const key = import.meta.env.VITE_CRON_KEY;
	console.log('key: ', JSON.stringify(key, null, 2));
	console.log('request.headers: ', JSON.stringify(request.headers, null, 2));
	const reqKey = request.headers.get('Authorization')?.split(' ')[1];
	console.log('reqKey: ', JSON.stringify(reqKey, null, 2));
	if (reqKey === key) {
		console.log('authed!');
		const ref = dbADMIN.ref('todos');
		const items = (await ref.once('value')).val();
		console.log('items read: ', JSON.stringify(items, null, 2));
		items.forEach((item) => {
			item.remaining--;
		});
		await ref.set(items);
		console.log('items updated: ', JSON.stringify(items, null, 2));
		return {
			status: 200,
			headers: {
				...noCacheHeaders
			}
		};
	} else {
		console.log('not authed!');
		return {
			status: 404,
			headers: {
				...noCacheHeaders
			}
		};
	}
};
