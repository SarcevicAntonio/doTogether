<script>
	import RoomList from '$lib/RoomList.svelte';
	import { current_room } from '$lib/stores/current-room';
	import { rooms } from '$lib/stores/rooms';

	$: room = $rooms.get($current_room);
</script>

<RoomList />

<br />

{#if room}
	{#each room.todos as item}
		{JSON.stringify(item)}
	{/each}
{/if}
