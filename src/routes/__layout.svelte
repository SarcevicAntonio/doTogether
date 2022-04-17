<script>
	import { authStore } from '$lib/firebase';
	import Auth from './auth.svelte';
</script>

{#if !$authStore}
	<Auth />
{:else}
	<slot />
{/if}
