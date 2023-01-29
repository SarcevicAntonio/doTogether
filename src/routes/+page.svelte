<script>
	import { task_list_map } from '$lib/stores/task_lists';
</script>

go to a room:

<ul>
	<li>
		{#each [...$task_list_map] as [id, list]}
			<a href="{id}">{list?.label || id}</a>
		{/each}
	</li>
</ul>
