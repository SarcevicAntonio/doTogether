<script>
	import { auth } from '$lib/firebase';
	import Logo from '$lib/Logo.svelte';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

	const provider = new GoogleAuthProvider();
	function logout() {
		auth.signOut();
	}

	function popAuth() {
		signInWithPopup(auth, provider);
	}

	let user = null;
	auth.onAuthStateChanged((userChanged) => {
		user = userChanged;
	});
</script>

<main>
	{#if !user}
		<button on:click={popAuth}>🔑 Login with Google</button>
	{:else}
		<button on:click={logout}>🔒 Logout</button>
		<div class="user">
			<div class="flx g1 aic">
				<img src={user.photoURL} alt="Your Google profile" />
				<h2>{user.displayName}</h2>
			</div>
			<ul>
				<li>Email: {user.email}</li>
				<li>uid: {user.uid}</li>
			</ul>
		</div>
		<a href="/">📝 Go to list!</a>
	{/if}
</main>

<style>
	main {
		min-height: 60vw;
		display: grid;
		place-items: center;
		gap: 2em;
	}

	.user {
		background-color: var(--surface);
		color: var(--on-surface);
		padding: 0.5rem;
		border-radius: 1rem;
	}

	img {
		border-radius: 1em;
	}

	ul {
		list-style: none;
		text-align: center;
		padding: 0;
	}
</style>
