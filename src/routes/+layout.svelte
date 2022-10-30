<script>
	import { auth } from '$lib/firebase';
	import Landing from '$lib/Landing.svelte';
	import Logo from '$lib/Logo.svelte';
	import { user } from '$lib/stores/user';
	import { Notifications } from 'as-comps';
	import IconProfile from '~icons/ic/round-account-circle';
	import '../global.css';
	import Auth from './auth/+page.svelte';

	let img_error = false;

	let loading_user = true;

	auth.onAuthStateChanged((user_changed) => {
		user.set(user_changed);
		loading_user = false;
	});
</script>

<Notifications />

<header>
	<h1><Logo /> doTogether</h1>
	<div>
		{#if $user}
			<a class="btn text" href="/auth">
				{#if $user.photoURL && !img_error}
					<img
						src={$user.photoURL}
						alt="You"
						class="profile-img"
						on:error={() => (img_error = true)}
					/>
				{:else}
					<IconProfile />
				{/if}
			</a>
		{/if}
	</div>
</header>

{#if loading_user}
	<span>Loading ...</span>
{:else if !$user}
	<Landing />
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

	span {
		text-align: center;
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
