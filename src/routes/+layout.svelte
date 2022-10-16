<script>
	import Logo from '$lib/Logo.svelte';
	import { user } from '$lib/stores/user';
	import '../global.css';
	import Auth from './auth/+page.svelte';
</script>

<header>
	<h1><Logo /> doTogether</h1>
</header>
{#if !$user}
	<Auth />
{:else}
	<slot />
{/if}

<style>
	h1 {
		margin-top: 0.5em;
		margin-bottom: 1em;
	}
</style>
