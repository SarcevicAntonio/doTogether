<script>
	import { goto } from '$app/navigation';
	import { create_new_room } from '$lib/create_new_room';
	import { current_room } from '$lib/stores/current-room';
	import { keychain } from '$lib/stores/keychain';
	import { Dialog } from 'as-comps';
	import IcBaselineKey from '~icons/ic/baseline-key';
	import IcRoundAdd from '~icons/ic/round-add';
	import IcRoundDoorSliding from '~icons/ic/round-door-sliding';
	import IcRoundGrid3x3 from '~icons/ic/round-grid-3x3';
	import IcRoundLocalOffer from '~icons/ic/round-local-offer';

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
			<IcRoundAdd />
			Create new room
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
					Room Label
				</span>
				<input bind:value={new_room_label} />
			</label>
			<button disabled={pending}>
				<IcRoundAdd />
				Create new room
			</button>
		</form>
	</Dialog>

	<Dialog let:toggle>
		<svelte:fragment slot="trigger-label">
			<IcRoundDoorSliding />
			Join room
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
					<IcRoundGrid3x3 /> Room ID
				</span>
				<input bind:value={joining_room.id} />
			</label>
			<label>
				<span>
					<IcBaselineKey /> Room Key
				</span>
				<input bind:value={joining_room.key} />
			</label>
			<button disabled={pending || !joining_room.id || !joining_room.key}>
				<IcRoundDoorSliding /> Join room
			</button>
		</form>
	</Dialog>
</div>

<style>
	.new-room-buttons {
		display: flex;
		align-items: stretch;
		justify-content: center;
		flex-direction: column;
		gap: 2em;
	}

	:global(.new-room-buttons > button) {
		justify-content: center;
		font-size: 1.75rem;
	}

	span {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.25em;
	}
</style>
