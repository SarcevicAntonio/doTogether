import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = (req) => {
	// items = [...items, {label, days: returnIn, remaining: 0, id: nextId++}];

	return { body: JSON.stringify(req) };
};
