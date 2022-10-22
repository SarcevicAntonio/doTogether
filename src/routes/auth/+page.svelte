<script>
	import { auth } from '$lib/firebase';
	import { user } from '$lib/stores/user';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import IcRoundHouse from '~icons/ic/round-house';
	import IcRoundLogin from '~icons/ic/round-login';
	import IcRoundLogout from '~icons/ic/round-logout';
	const provider = new GoogleAuthProvider();
	function logout() {
		auth.signOut();
	}

	function popAuth() {
		signInWithPopup(auth, provider);
	}
</script>

<main>
	{#if !$user}
		<button on:click={popAuth}>
			<IcRoundLogin /> Login with Google
		</button>
	{:else}
		<button on:click={logout}>
			<IcRoundLogout /> Logout
		</button>
		<div class="user">
			<div class="flx g1 aic">
				<img src={$user.photoURL} alt="Your Google profile" />
				<h2>{$user.displayName}</h2>
			</div>
			<ul>
				<li>Email: {$user.email}</li>
				<li>uid: {$user.uid}</li>
			</ul>
		</div>
		<a href="/"><IcRoundHouse /> Go to Rooms!</a>
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
