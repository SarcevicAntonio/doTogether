/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: import('firebase/auth').User | import('firebase-admin/auth').UserRecord | null;
	}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
