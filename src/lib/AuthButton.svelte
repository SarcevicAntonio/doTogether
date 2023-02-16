<script>
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import IcRoundLogin from '~icons/ic/round-login';
	import { auth } from './firebase';
	const provider = new GoogleAuthProvider();

	async function popAuth() {
		await signInWithPopup(auth, provider);
	}
</script>

<button on:click={popAuth}>
	<IcRoundLogin /> Login with Google
</button>

<style>
	button {
		justify-content: center;
		font-size: 1.75rem;
		margin: auto;
	}
</style>
