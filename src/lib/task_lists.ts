import { db } from '$lib/firebase'
import type { Task } from '$lib/task'
import { ref, remove } from 'firebase/database'

export interface Task_List {
	id: string
	key: string
	label: string
	tasks: Task[]
}

export async function delete_list(id: string): Promise<void> {
	const dbRef = ref(db, 'lists/' + id)
	await remove(dbRef)
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
