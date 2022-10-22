<script>
	import { db } from '$lib/firebase';
	import Room from '$lib/Room.svelte';
	import RoomList from '$lib/RoomList.svelte';
	import { current_room } from '$lib/stores/current-room';
	import { delete_room, rooms } from '$lib/stores/rooms';
	import { ref, set } from 'firebase/database';

	$: room = $rooms.get($current_room);
	$: room_path = `/rooms/${$current_room}`;
	$: room_ref = ref(db, room_path);
	$: item_ref = ref(db, room_path + '/todos');
</script>

<RoomList />

<br />

{#if room}
	<Room
		{room}
		on:change={() => {}}
		on:delete={() => {
			delete_room($current_room);
		}}
		on:todos-change={({ detail: todos }) => {
			set(item_ref, todos);
		}}
	/>
{/if}
