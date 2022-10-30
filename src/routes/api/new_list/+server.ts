import { dbADMIN } from '$lib/firebase-admin';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	// TODO: check if authorized n shit
	const { label } = await request.json();
	const list = {
		label,
		key: crypto.randomUUID()
	};
	const id = crypto.randomUUID();
	const ref = dbADMIN.ref('lists/' + id);
	ref.set(list);
	return new Response(JSON.stringify({ list, id }));
};
