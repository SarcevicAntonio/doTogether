<script lang="ts">
	import { browser } from '$app/environment'
	import { goto, invalidate } from '$app/navigation'
	import { page } from '$app/stores'
	import TaskList from '$lib/components/TaskList.svelte'
	import TaskListSelector from '$lib/components/TaskListSelector.svelte'
	import { db } from '$lib/firebase'
	import type { Task_List } from '$lib/task_lists'
	import type { Unsubscribe } from 'firebase/auth'
	import { onValue, ref, remove, set, type DatabaseReference } from 'firebase/database'
	import IcRoundFolderOff from '~icons/ic/round-folder-off'
	import type { PageData } from './$types'

	export let data: PageData

	$: current_list = data.task_list?.find((l) => l.id === $page.params.list_id)
	$: list_path = `/lists/${$page.params.list_id}`
	$: list_ref = ref(db, list_path)
	$: item_ref = ref(db, list_path + '/tasks')
	$: subscribe_list(list_ref)

	let unsubscribe: Unsubscribe | undefined

	function subscribe_list(list_ref: DatabaseReference) {
		if (!browser) return
		if (!list_ref) return
		if (unsubscribe) unsubscribe()
		unsubscribe = onValue(list_ref, (snapshot) => {
			console.log('realtime snapshot: ', snapshot.val())
			current_list = snapshot.val() as Task_List
		})
	}
</script>

<TaskListSelector task_list={data.task_list} />

{#if current_list}
	<TaskList
		task_list={current_list}
		on:list-change={({ detail: list }) => {
			set(list_ref, list)
		}}
		on:tasks-change={({ detail: tasks }) => {
			set(item_ref, tasks)
		}}
		on:delete={async () => {
			const dbRef = ref(db, 'lists/' + $page.params.list_id)
			await remove(dbRef)
			await invalidate('data:user')
			goto('/')
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
