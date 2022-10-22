import { keychain } from './stores/keychain';

export async function create_new_room(label) {
	const { room, id } = await fetch('/api/new_room', {
		method: 'POST',
		body: JSON.stringify({
			label
		})
	}).then((res) => res.json());
	await keychain.add(id, room.key);
	return { room, id };
}
