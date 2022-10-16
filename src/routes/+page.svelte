<script>
	import { rooms } from '$lib/stores/rooms';
</script>

<pre>{JSON.stringify($rooms, null, 2)}</pre>

{#each [...$rooms] as [id, room]}
	<a href="/room/{id}">{room.title}</a>
{/each}
