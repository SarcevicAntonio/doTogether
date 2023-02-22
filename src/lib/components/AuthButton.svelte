<script>
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
	import IcRoundLogin from '~icons/ic/round-login'
	import { auth } from '../firebase'
	const provider = new GoogleAuthProvider()

	async function pop_auth() {
		await signInWithPopup(auth, provider)
	}
</script>

<button on:click={pop_auth}>
	<IcRoundLogin /> Login with Google
</button>

<style>
	button {
		justify-content: center;
		font-size: 1.75rem;
		margin: auto;
	}
</style>
