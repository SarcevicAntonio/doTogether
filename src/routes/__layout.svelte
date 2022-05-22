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

<header>
	<h1><Logo /> doTogether</h1>
</header>
{#if loading}
	<h2>Loading ...</h2>
{:else if !user}
	<Auth />
{:else}
	<slot />
{/if}

<style>
	h1 {
		margin-top: 0.5em;
		margin-bottom: 1em;
	}
	h2 {
		text-align: center;
	}
</style>
