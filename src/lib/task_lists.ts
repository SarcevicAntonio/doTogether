import type { Task } from '$lib/task'

export interface Task_List {
	id: string
	key: string
	label: string
	tasks: Task[]
}

export async function create_list(label: string) {
	const { list, id } = await fetch('/api/new_list', {
		method: 'POST',
		body: JSON.stringify({
			label
		})
	}).then((res) => res.json())
	return { list, id }
}
