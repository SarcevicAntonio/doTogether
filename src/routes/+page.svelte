<script>
	import { db } from '$lib/firebase';
	import { current_list, current_list_id } from '$lib/stores/current_list';
	import { delete_list } from '$lib/stores/task_lists';
	import TaskList from '$lib/TaskList.svelte';
	import TaskListSelector from '$lib/TaskListSelector.svelte';
	import { ref, set } from 'firebase/database';
	import IcRoundFilterNone from '~icons/ic/round-filter-none';

	$: list_path = `/lists/${$current_list_id}`;
	$: list_ref = ref(db, list_path);
	$: item_ref = ref(db, list_path + '/tasks');
</script>

<TaskListSelector />

{#if $current_list}
	<TaskList
		task_list={$current_list}
		on:list-change={({ detail: list }) => {
			set(list_ref, list);
		}}
		on:tasks-change={({ detail: tasks }) => {
			set(item_ref, tasks);
		}}
		on:delete={() => {
			delete_list($current_list_id);
		}}
	/>
{:else}
	<div class="empty">
		<IcRoundFilterNone />
		<p>No List selected...</p>
		<p>Select or create a list above.</p>
	</div>
{/if}
