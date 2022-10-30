import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import { task_list_map, type Task_List } from './task_lists';

const LS_KEY = 'current_list';

export const current_list_id = writable(browser ? localStorage.getItem(LS_KEY) : null);

export function set_current_list_id(val: string) {
	localStorage.setItem(LS_KEY, val);
	current_list_id.set(val);
}

function select_next_list_id(
	$task_list_map: Map<string, Task_List>,
	$current_list_id: string
): string {
	// no tasks lists
	if ($task_list_map.size === 0) return $current_list_id;
	// no (fitting) current_list
	if ($task_list_map.get($current_list_id)) return $current_list_id;
	const next_list_id = $task_list_map.entries().next().value[0];
	set_current_list_id(next_list_id);
	return next_list_id;
}

export const current_list = derived(
	[task_list_map, current_list_id],
	([$task_list_map, $current_list_id]) => {
		if (!$task_list_map || !$current_list_id) return;
		$current_list_id = select_next_list_id($task_list_map, $current_list_id);
		return $task_list_map.get($current_list_id);
	}
);
