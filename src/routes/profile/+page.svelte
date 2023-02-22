<script lang="ts">
	import { goto, invalidate } from '$app/navigation'
	import AuthButton from '$lib/components/AuthButton.svelte'
	import { auth } from '$lib/firebase'
	import IcRoundHouse from '~icons/ic/round-house'
	import IcRoundLogout from '~icons/ic/round-logout'
	import type { PageData } from './$types'

	export let data: PageData

	async function logout() {
		await auth.signOut()
		await invalidate('data:user')
		goto('/')
	}
</script>

<section>
	{#if !data.user}
		<AuthButton />
	{:else}
		<button on:click={logout}>
			<IcRoundLogout /> Logout
		</button>
		<div class="user">
			<div class="flx g1 aic">
				<img src={data.user.photo} alt="Your Google profile" />
				<h2>{data.user.name}</h2>
			</div>
			<ul>
				<li>Email: {data.user.email}</li>
				<li>uid: {data.user.id}</li>
			</ul>
		</div>
		<a href="/"><IcRoundHouse /> Go to your Lists!</a>
	{/if}
</section>

<style>
	section {
		margin-top: 2em;
		display: grid;
		place-items: center;
		gap: 2em;
	}

	.user {
		background-color: var(--surface);
		color: var(--on-surface);
		padding: 0.5rem;
		border-radius: 1rem;
	}

	img {
		border-radius: 1em;
	}

	ul {
		list-style: none;
		text-align: center;
		padding: 0;
	}
</style>
