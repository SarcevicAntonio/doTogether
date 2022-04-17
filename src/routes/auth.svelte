<script>
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	const provider = new GoogleAuthProvider();
	function logout() {
		auth.signOut();
	}

	function popAuth() {
		signInWithPopup(auth, provider);
	}

	let user = null;
	auth.onAuthStateChanged((user) => {
		user = user;
	});
</script>

{#if !user}
	<button on:click={popAuth}> auth now </button>
{:else}
	<pre>{JSON.stringify(user, null, 2)}</pre>
	<button on:click={logout}>logout</button>
{/if}
