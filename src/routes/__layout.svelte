<script>
	import { auth } from '$lib/firebase';
	import Logo from '$lib/Logo.svelte';
	import '../global.css';
	import Auth from './auth.svelte';

	let loading = true;
	let user = null;
	auth.onAuthStateChanged((userChanged) => {
		user = userChanged;
		loading = false;
	});
</script>

{#if loading}
	<h1><Logo /> doTogether</h1>
	<h2>Loading ...</h2>
{:else if !user}
	<Auth />
{:else}
	<slot />
{/if}

<style>
	h2 {
		margin-top: 2em;
		text-align: center;
	}
</style>
