<script>
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { add_list_key } from '$lib/user'
	import IcRoundArrowBack from '~icons/ic/round-arrow-back'
	import IcRoundVpnKey from '~icons/ic/round-vpn-key'

	const id = $page.params.list_id
	const key = $page.url.searchParams.get('key')

	let pending = false
</script>

<div class="join-list-buttons">
	<h2>Do you want to join this list?</h2>
	<button
		disabled={pending}
		on:click={async () => {
			if (pending) return
			pending = true
			await add_list_key(id, key)
			pending = false
			goto(id)
		}}
	>
		<IcRoundVpnKey />
		Yes, Join List!
	</button>

	<a href="/">
		<IcRoundArrowBack />
		Back To Your Lists
	</a>
</div>

<style>
	.join-list-buttons {
		display: flex;
		align-items: stretch;
		justify-content: center;
		flex-direction: column;
		gap: 2em;
	}

	h2 {
		text-align: center;
	}

	:global(.join-list-buttons > button, a) {
		font-size: 1.75rem;
		text-decoration: none;
	}
</style>
