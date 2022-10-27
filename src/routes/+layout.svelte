<script>
	import Logo from '$lib/Logo.svelte';
	import { user } from '$lib/stores/user';
	import IconProfile from '~icons/ic/round-account-circle';
	import '../global.css';
	import Auth from './auth/+page.svelte';

	let imgError = false;
</script>

<header>
	<h1><Logo /> doTogether</h1>
	<div>
		{#if $user}
			<a data-sveltekit-prefetch class="btn text" href="/auth">
				{#if $user.photoURL && !imgError}
					<img
						src={$user.photoURL}
						alt="You"
						class="profile-img"
						on:error={() => (imgError = true)}
					/>
				{:else}
					<IconProfile />
				{/if}
			</a>
		{/if}
	</div>
</header>
{#if !$user}
	<Auth />
{:else}
	<slot />
{/if}

<style>
	header {
		margin-top: 0.5em;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1em;
	}

	a {
		padding: 0;
		margin: 0;
		border-radius: 50%;
		overflow: hidden;
	}

	.profile-img {
		aspect-ratio: 1/1;
		height: 1.8em;
	}
</style>
