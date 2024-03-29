/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Error {}
	interface Locals {
		user: import('./lib/user').User | null
	}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
