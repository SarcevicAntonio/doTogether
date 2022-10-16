<script>
	import { page } from '$app/stores';
	import { rooms } from '$lib/stores/rooms';

	$: room = $rooms.get($page.params.id);
</script>

{#if room}
	{room.title}
	{#each room.todos as item}
		{item}
	{/each}
{/if}
