import { cert, initializeApp, getApp, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getDatabase } from 'firebase-admin/database'

const adminCreds = {
	projectId: import.meta.env.VITE_FIRE_PROJECTID as string,
	clientEmail: import.meta.env.VITE_FIRE_ADMIN_EMAIL as string,
	privateKey: (import.meta.env.VITE_FIRE_ADMIN_KEY as string).replace(/\\n/g, '\n')
}

if (!adminCreds.clientEmail) {
	throw new Error('VITE_FIRE_ADMIN_EMAIL is not set')
}

export function getAdmin() {
	let app = undefined
	if (getApps().length) {
		app = getApp()
	} else {
		app = initializeApp({
			credential: cert(adminCreds),
			databaseURL: import.meta.env.VITE_FIRE_DATABASEURL
		})
	}

	if (!app) throw new Error('something went wrong with app: ' + JSON.stringify(app, null, 2))

	const auth = getAuth()
	const db = getDatabase()

	return { app, db, auth }
}

export const appADMIN = getAdmin().app
export const authADMIN = getAdmin().auth
export const dbADMIN = getAdmin().db
