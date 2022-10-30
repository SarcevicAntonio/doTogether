import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import { task_list_map, type Task_List } from './task_lists';

const LS_KEY = 'current_list';

const { subscribe, set } = writable(browser ? localStorage.getItem(LS_KEY) : null);
export const current_list_id = { subscribe };

export function set_current_list_id(val: string) {
	localStorage.setItem(LS_KEY, val);
	set(val);
}

function select_next_list_id(
	$task_list_map: Map<string, Task_List>,
	$current_list_id: string
): string {
	// no tasks lists
	if ($task_list_map.size === 0) return $current_list_id;

	const local_store_value = localStorage.getItem(LS_KEY);
	if (local_store_value && $task_list_map.get(local_store_value)) {
		return local_store_value;
	}

	if ($task_list_map.get($current_list_id)) return $current_list_id;

	// no (fitting) current_list
	const next_list_id = $task_list_map.entries().next().value[0];

	return next_list_id;
}

export const current_list = derived(
	[task_list_map, current_list_id],
	([$task_list_map, $current_list_id]) => {
		if (!$task_list_map || !$current_list_id) return;
		$current_list_id = select_next_list_id($task_list_map, $current_list_id);
		set($current_list_id);
		return $task_list_map.get($current_list_id);
	}
);
