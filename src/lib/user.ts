import { ref, set, remove } from 'firebase/database'
import { auth, db } from './firebase'

export interface User {
	id: string
	name?: string
	email?: string
	photo?: string
}

export async function add_list_key(id: string, key: string) {
	const user = auth.currentUser
	if (!user) return
	const dbRef = ref(db, 'members/' + user.uid + '/' + id)
	await set(dbRef, key)
}

export async function remove_list_key(id: string) {
	const user = auth.currentUser
	if (!user) return
	const dbRef = ref(db, 'members/' + user.uid + '/' + id)
	await remove(dbRef)
}
