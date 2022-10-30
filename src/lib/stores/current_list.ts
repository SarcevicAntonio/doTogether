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
	const ls_val = localStorage.getItem(LS_KEY);
	if (ls_val && $task_list_map.get(ls_val)) return ls_val;
	if ($task_list_map.get($current_list_id)) return $current_list_id;
	return '---not-found---';
	// return [...$task_list_map][0][0];
}

export const current_list = derived(
	[task_list_map, current_list_id],
	([$task_list_map, $current_list_id]) => {
		if (!$task_list_map || !$task_list_map.size || !$current_list_id) return;
		$current_list_id = select_next_list_id($task_list_map, $current_list_id);
		set($current_list_id);
		return $task_list_map.get($current_list_id);
	}
);
