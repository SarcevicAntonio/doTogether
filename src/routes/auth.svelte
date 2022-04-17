<script>
	import { auth, authStore } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	const provider = new GoogleAuthProvider();
	function logout() {
		auth.signOut();
	}

	function popAuth() {
		signInWithPopup(auth, provider);
	}
</script>

{#if !$authStore}
	<button on:click={popAuth}> auth now </button>
{:else}
	<pre>{JSON.stringify($authStore, null, 2)}</pre>
	<button on:click={logout}>logout</button>
{/if}
