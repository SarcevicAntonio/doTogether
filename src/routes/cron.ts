import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = ({ request }) => {
	const key = import.meta.env.VITE_CRON_KEY;
	console.log('key: ', JSON.stringify(key, null, 2));
	console.log('request.headers: ', JSON.stringify(request.headers, null, 2));
	const reqKey = request.headers.get('authorization').split(' ')[1];
	console.log('reqKey: ', JSON.stringify(reqKey, null, 2));
	if (reqKey === key) {
		console.log('true');
	} else {
		console.log('false');
	}
	return { status: 200 };
};
