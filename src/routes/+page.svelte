<script>
	import RoomList from '$lib/RoomList.svelte';
	import { current_room } from '$lib/stores/current-room';
	import { delete_room, rooms } from '$lib/stores/rooms';
	import Dialog from 'as-comps/Dialog.svelte';

	$: room = $rooms.get($current_room);
</script>

<RoomList />

<br />

{#if room}
	{#each room.todos as item}
		{JSON.stringify(item)}
	{/each}

	<Dialog>
		<svelte:fragment slot="trigger-label">Management</svelte:fragment>
		<Dialog>
			<svelte:fragment slot="trigger-label">Delete</svelte:fragment>
			<button
				on:click={() => {
					delete_room($current_room);
				}}>delete</button
			>
		</Dialog>
	</Dialog>
{/if}
