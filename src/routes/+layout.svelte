<script lang="ts">
	import { browser } from '$app/environment';
	import Credits from '$lib/Credits.svelte';
	import { auth } from '$lib/firebase';
	import Landing from '$lib/Landing.svelte';
	import Logo from '$lib/Logo.svelte';
	import { user } from '$lib/stores/user';
	import { Notifications } from 'as-comps';
	import IconProfile from '~icons/ic/round-account-circle';
	import LineMdLoadingLoop from '~icons/line-md/loading-loop';
	import '../global.css';
	import type { PageData } from './$types';
	import Auth from './auth/+page.svelte';

	export let data: PageData;
	// if (data.user) $user = data.user;

	let loading_user = true;
	let img_error = false;

	auth.onAuthStateChanged(async (user_changed) => {
		if (!browser) return;
		user.set(user_changed);
		loading_user = false;

		if (!user_changed) {
			await fetch('/auth', {
				method: 'POST'
			});
			return;
		}

		const token = await user_changed.getIdToken(true);
		await fetch('/auth', {
			method: 'POST',
			body: JSON.stringify({ token })
		});
	});

	let showCredits = false;
</script>

<header>
	<button on:click={() => (showCredits = !showCredits)}>
		<h1><Logo /> doTogether</h1>
	</button>
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

<main>
	{#if loading_user}
		<div class="empty">
			<LineMdLoadingLoop />
			<span>Loading ...</span>
		</div>
	{:else if !$user}
		<Landing />
		<Auth />
	{:else}
		<slot />
	{/if}
</main>

<Notifications />

<Credits bind:isOpen={showCredits} />

<style>
	button {
		background-color: transparent;
		padding: 0;
	}
	header {
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

	.empty {
		flex: 1;
	}
</style>
