<script lang="ts">
	import TaskListSelector from '$lib/components/TaskListSelector.svelte'
	import IcRoundFolderOff from '~icons/ic/round-folder-off'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<TaskListSelector task_list={data.task_list} />
<div class="empty">
	<IcRoundFolderOff />
	<span>No List selected...</span>
	<span>Select or create a list above.</span>
</div>

<style>
	.empty {
		flex: 1;
	}
</style>
