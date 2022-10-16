<script>
	import { page } from '$app/stores';
	import { rooms } from '$lib/stores/rooms';

	$: room = $rooms.get($page.params.id);
</script>

{room.title}

{room.todos}
