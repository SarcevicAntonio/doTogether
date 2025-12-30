import { sveltekit } from '@sveltejs/kit/vite'
import Icons from 'unplugin-icons/vite'
import devtoolsJson from 'vite-plugin-devtools-json'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		devtoolsJson(),
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	],
	define: {
		'process.env.NODE_ENV': '"production"'
	}
}

export default config
