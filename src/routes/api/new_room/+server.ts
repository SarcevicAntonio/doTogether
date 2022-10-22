import { dbADMIN } from '$lib/firebase-admin';
import { default_item } from '$lib/items';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	// TODO: check if authorized n shit
	const { label } = await request.json();
	const room = {
		label,
		key: crypto.randomUUID(),
		todos: [default_item]
	};
	const id = crypto.randomUUID();
	const ref = dbADMIN.ref('rooms/' + id);
	ref.set(room);
	return new Response(JSON.stringify({ room, id }));
};
