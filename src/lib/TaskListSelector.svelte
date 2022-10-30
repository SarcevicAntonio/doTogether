<script>
	import { goto } from '$app/navigation';
	import { task_list_map } from '$lib/stores/task_lists';
	import IcRoundListAlt from '~icons/ic/round-list-alt';
	import { current_list_id, set_current_list_id } from './stores/current_list';

	const handleChange = (e) => {
		const val = e.target.value;
		switch (val) {
			case '#ADD':
				goto('/add');
				break;
			case '#---':
				e.target.value = $current_list_id;
				break;
			default:
				set_current_list_id(val);
				break;
		}
	};
</script>

{#if $task_list_map}
	<label for="list">
		<span> <IcRoundListAlt /> Current List </span>
		<select id="list" value={$current_list_id} on:change={handleChange}>
			{#each [...$task_list_map] as [id, list]}
				<option value={id}>{list?.label || id}</option>
			{/each}
			<option value="#---">-------------</option>
			<option value="#ADD">[ + Add List ]</option>
		</select>
	</label>
{/if}

<style>
	select {
		width: 100%;
	}
	span {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.25em;
	}
</style>
