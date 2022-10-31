<script>
	import { db } from '$lib/firebase';
	import { current_list, current_list_id } from '$lib/stores/current_list';
	import { delete_list } from '$lib/stores/task_lists';
	import TaskList from '$lib/TaskList.svelte';
	import TaskListSelector from '$lib/TaskListSelector.svelte';
	import { ref, set } from 'firebase/database';
	import IcRoundFolderOff from '~icons/ic/round-folder-off';

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
		<IcRoundFolderOff />
		<span>No List selected...</span>
		<span>Select or create a list above.</span>
	</div>
{/if}
