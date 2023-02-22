import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIRE_APIKEY,
	authDomain: import.meta.env.VITE_FIRE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FIRE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIRE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIRE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_FIRE_APPID,
	databaseURL: import.meta.env.VITE_FIRE_DATABASEURL
}

if (!firebaseConfig.apiKey) {
	throw new Error('VITE_FIRE_APIKEY is not set')
}

export function getClient() {
	let app = undefined
	if (getApps().length) {
		app = getApp()
	} else {
		app = initializeApp(firebaseConfig)
	}
	if (!app) throw new Error('something went wrong with app: ' + JSON.stringify(app, null, 2))

	const auth = getAuth(app)
	const db = getDatabase(app)

	return { app, db, auth }
}

export const app = getClient().app
export const auth = getClient().auth
export const db = getClient().db
