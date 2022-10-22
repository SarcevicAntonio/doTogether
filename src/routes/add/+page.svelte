<script>
	import { goto } from '$app/navigation';
	import { create_new_room } from '$lib/create_new_room';
	import { current_room } from '$lib/stores/current-room';
	import { keychain } from '$lib/stores/keychain';
	import { Dialog } from 'as-comps';

	let new_room_label = '';

	let joining_room = {
		id: '',
		key: ''
	};

	let pending = false;
</script>

<Dialog let:toggle>
	<svelte:fragment slot="trigger-label">Create new room</svelte:fragment>
	<form
		on:submit|preventDefault={async () => {
			if (pending) return;
			pending = true;
			const { id } = await create_new_room(new_room_label);
			pending = false;
			current_room.set(id);
			toggle();
			goto('/');
		}}
	>
		<label>
			<span>Room Label</span>
			<input bind:value={new_room_label} />
		</label>
		<button disabled={pending}>Create new room</button>
	</form>
</Dialog>

<br />

<Dialog let:toggle>
	<svelte:fragment slot="trigger-label">Join room</svelte:fragment>
	<form
		on:submit|preventDefault={async () => {
			if (pending) return;
			pending = true;
			await keychain.add(joining_room.id, joining_room.key);
			// todo fix wonkyness
			pending = false;
			current_room.set(joining_room.id);
			joining_room = {
				id: '',
				key: ''
			};
			toggle();
			goto('/');
		}}
	>
		<label>
			<span>Room ID</span>
			<input bind:value={joining_room.id} />
		</label>
		<label>
			<span>Room Key</span>
			<input bind:value={joining_room.key} />
		</label>
		<button disabled={pending}>Create new room</button>
	</form>
</Dialog>
