import { cert, initializeApp, getApp, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getDatabase } from 'firebase-admin/database'

const admin_credentials = {
	projectId: import.meta.env.VITE_FIRE_PROJECTID as string,
	clientEmail: import.meta.env.VITE_FIRE_ADMIN_EMAIL as string,
	privateKey: (import.meta.env.VITE_FIRE_ADMIN_KEY as string).replace(/\\n/g, '\n')
}

export function get_admin_app() {
	let app = undefined
	if (getApps().length) {
		app = getApp()
	} else {
		app = initializeApp({
			credential: cert(admin_credentials),
			databaseURL: import.meta.env.VITE_FIRE_DATABASEURL
		})
	}

	if (!app) throw new Error('something went wrong with app: ' + JSON.stringify(app, null, 2))

	const auth = getAuth()
	const db = getDatabase()

	return { app, db, auth }
}

export const server_app = get_admin_app().app
export const server_auth = get_admin_app().auth
export const server_db = get_admin_app().db
