<script lang="ts">
	import { browser } from '$app/environment'
	import { invalidate } from '$app/navigation'
	import AuthButton from '$lib/components/AuthButton.svelte'
	import Credits from '$lib/components/Credits.svelte'
	import Landing from '$lib/components/Landing.svelte'
	import Logo from '$lib/components/Logo.svelte'
	import { auth } from '$lib/firebase'
	import { Notifications } from 'as-comps'
	import IconProfile from '~icons/ic/round-account-circle'
	import LineMdLoadingLoop from '~icons/line-md/loading-loop'
	import '../global.css'

	import type { PageData } from './$types'

	export let data: PageData

	let img_error = false
	let show_credits = false

	let auth_state_changed = false
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
		await invalidate('data:user')
		auth_state_changed = true
	})
</script>

<header>
	<button on:click={() => (show_credits = !show_credits)}>
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
		{#if !auth_state_changed}
			<div class="empty">
				<LineMdLoadingLoop />
				<span>Loading ...</span>
			</div>
		{:else}
			<Landing />
			<AuthButton />
		{/if}
	{:else}
		<slot />
	{/if}
</main>
<Credits bind:isOpen={show_credits} />
<Notifications />

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
