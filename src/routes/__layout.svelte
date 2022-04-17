<script>
	import { auth } from '$lib/firebase';
	import Auth from './auth.svelte';
	import '../global.css';

	let user = null;
	auth.onAuthStateChanged((userChanged) => {
		user = userChanged;
	});
</script>

{#if !user}
	<Auth />
{:else}
	<slot />
{/if}
