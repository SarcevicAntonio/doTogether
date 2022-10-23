<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { current_room } from '$lib/stores/current-room';
	import { keychain } from '$lib/stores/keychain';

	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundVpnKey from '~icons/ic/round-vpn-key';

	const id = $page.params.room_id;
	const key = $page.url.searchParams.get('key');

	let pending = false;
</script>

<div class="join-room-buttons">
	<h2>Do you want to join this list?</h2>
	<button
		disabled={pending}
		on:click={async () => {
			if (pending) return;
			pending = true;
			await keychain.add(id, key);
			pending = false;
			current_room.set(id);
			goto('/');
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
	.join-room-buttons {
		display: flex;
		align-items: stretch;
		justify-content: center;
		flex-direction: column;
		gap: 2em;
	}

	h2 {
		text-align: center;
	}

	:global(.join-room-buttons > button, a) {
		font-size: 1.75rem;
		text-decoration: none;
	}
</style>
