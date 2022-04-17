<script>
	import { auth } from '$lib/firebase';
	import Auth from './auth.svelte';

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
