<script>
	import { goto } from '$app/navigation';
	import { create_new_room } from '$lib/create_new_room';
	import { current_room } from '$lib/stores/current-room';
	import { keychain } from '$lib/stores/keychain';
	import { Dialog } from 'as-comps';
	import IcBaselineKey from '~icons/ic/baseline-key';
	import IcRoundAdd from '~icons/ic/round-add';
	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundGrid3x3 from '~icons/ic/round-grid-3x3';
	import IcRoundLocalOffer from '~icons/ic/round-local-offer';
	import IcRoundVpnKey from '~icons/ic/round-vpn-key';
	import IcRoundPlaylistAdd from '~icons/ic/round-playlist-add';

	let new_room_label = '';

	let joining_room = {
		id: '',
		key: ''
	};

	let pending = false;
</script>

<div class="new-room-buttons">
	<Dialog let:toggle>
		<svelte:fragment slot="trigger-label">
			<IcRoundPlaylistAdd />
			Create New List
		</svelte:fragment>
		<form
			on:submit|preventDefault={async () => {
				if (pending) return;
				pending = true;
				const { id } = await create_new_room(new_room_label);
				pending = false;
				current_room.set(id);
				toggle();
				goto('/');
			}}
		>
			<label>
				<span>
					<IcRoundLocalOffer />
					List Label
				</span>
				<input bind:value={new_room_label} />
			</label>
			<button disabled={pending}>
				<IcRoundPlaylistAdd />
				Create New List
			</button>
		</form>
	</Dialog>

	<Dialog let:toggle>
		<svelte:fragment slot="trigger-label">
			<IcRoundVpnKey />
			Join Existing List
		</svelte:fragment>
		<form
			on:submit|preventDefault={async () => {
				if (pending) return;
				pending = true;
				await keychain.add(joining_room.id, joining_room.key);
				pending = false;
				current_room.set(joining_room.id);
				joining_room = {
					id: '',
					key: ''
				};
				toggle();
				goto('/');
			}}
		>
			<label>
				<span>
					<IcRoundGrid3x3 /> List ID
				</span>
				<input bind:value={joining_room.id} />
			</label>
			<label>
				<span>
					<IcBaselineKey /> List Key
				</span>
				<input bind:value={joining_room.key} />
			</label>
			<button disabled={pending || !joining_room.id || !joining_room.key}>
				<IcRoundVpnKey /> Join Existing List
			</button>
		</form>
	</Dialog>
	<a href="/">
		<IcRoundArrowBack />
		Back To Your Lists
	</a>
</div>

<style>
	.new-room-buttons {
		display: flex;
		align-items: stretch;
		justify-content: center;
		flex-direction: column;
		gap: 2em;
	}

	:global(.new-room-buttons > button, a) {
		font-size: 1.75rem;
		text-decoration: none;
	}

	span {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.25em;
	}
</style>
