/// <reference lib="webworker" />

// https://www.sarcevic.dev/offline-first-installable-pwa-sveltekit-workbox-precaching
import { build, files, prerendered, version } from '$service-worker'
import { precacheAndRoute } from 'workbox-precaching'
const precache_list = [...build, ...files, ...prerendered].map((s) => ({
	url: s,
	revision: version
}))

precacheAndRoute(precache_list)
