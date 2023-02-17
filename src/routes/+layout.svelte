<script lang="ts">
	import { browser } from '$app/environment'
	import { invalidate } from '$app/navigation'
	import AuthButton from '$lib/components/AuthButton.svelte'
	import Credits from '$lib/components/Credits.svelte'
	import { auth } from '$lib/firebase'
	import Landing from '$lib/components/Landing.svelte'
	import Logo from '$lib/components/Logo.svelte'
	import { Notifications } from 'as-comps'
	import IconProfile from '~icons/ic/round-account-circle'
	import '../global.css'
	import type { PageData } from './$types'

	export let data: PageData

	let img_error = false

	auth.onAuthStateChanged(async (user_changed) => {
		if (!browser) return
		if (user_changed) {
			const token = await user_changed.getIdToken(true)
			await fetch('/api/auth', {
				method: 'POST',
				body: JSON.stringify({ token })
			})
		} else {
			await fetch('/api/auth', {
				method: 'POST'
			})
		}
		invalidate('data:user')
	})

	let showCredits = false
</script>

<header>
	<button on:click={() => (showCredits = !showCredits)}>
		<h1><Logo /> doTogether</h1>
	</button>
	<div>
		{#if data.user}
			<a class="btn text" href="/profile">
				{#if data.user.photo && !img_error}
					<img
						src={data.user.photo}
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
	{#if !data.user}
		<Landing />
		<AuthButton />
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
