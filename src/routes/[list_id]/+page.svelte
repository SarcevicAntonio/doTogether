<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { db } from '$lib/firebase';
	import { delete_list, task_list_map } from '$lib/stores/task_lists';
	import TaskList from '$lib/TaskList.svelte';
	import TaskListSelector from '$lib/TaskListSelector.svelte';
	import { ref, set } from 'firebase/database';
	import IcRoundFolderOff from '~icons/ic/round-folder-off';

	$: list_path = `/lists/${$page.params.list_id}`;
	$: list_ref = ref(db, list_path);
	$: item_ref = ref(db, list_path + '/tasks');
	$: current_list = $task_list_map.get($page.params.list_id);
</script>

<TaskListSelector />

{#if current_list}
	<TaskList
		task_list={current_list}
		on:list-change={({ detail: list }) => {
			set(list_ref, list);
		}}
		on:tasks-change={({ detail: tasks }) => {
			set(item_ref, tasks);
		}}
		on:delete={() => {
			delete_list($page.params.list_id);
			goto('/');
		}}
	/>
{:else}
	<div class="empty">
		<IcRoundFolderOff />
		<span>No List selected...</span>
		<span>Select or create a list above.</span>
	</div>
{/if}

<style>
	.empty {
		flex: 1;
	}
</style>
