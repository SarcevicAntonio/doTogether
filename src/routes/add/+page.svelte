<script>
	import { goto } from '$app/navigation';
	import { set_current_list_id } from '$lib/stores/current_list';
	import { add_list_key } from '$lib/stores/keychain';
	import { create_new_list } from '$lib/stores/task_lists';
	import { Dialog } from 'as-comps';
	import IcBaselineKey from '~icons/ic/baseline-key';
	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundGrid3x3 from '~icons/ic/round-grid-3x3';
	import IcRoundLocalOffer from '~icons/ic/round-local-offer';
	import IcRoundPlaylistAdd from '~icons/ic/round-playlist-add';
	import IcRoundVpnKey from '~icons/ic/round-vpn-key';

	let new_list_label = '';

	let joining_list = {
		id: '',
		key: ''
	};

	let pending = false;
</script>

<div class="new-list-buttons">
	<Dialog>
		<svelte:fragment slot="trigger-label">
			<IcRoundPlaylistAdd />
			Create New List
		</svelte:fragment>
		<form
			on:submit|preventDefault={async () => {
				if (pending) return;
				pending = true;
				const { id } = await create_new_list(new_list_label);
				pending = false;
				set_current_list_id(id);
				goto('/');
			}}
		>
			<label>
				<span>
					<IcRoundLocalOffer />
					List Label
				</span>
				<input bind:value={new_list_label} />
			</label>
			<button disabled={pending}>
				<IcRoundPlaylistAdd />
				Create New List
			</button>
		</form>
	</Dialog>

	<Dialog>
		<svelte:fragment slot="trigger-label">
			<IcRoundVpnKey />
			Join Existing List
		</svelte:fragment>
		<form
			on:submit|preventDefault={async () => {
				if (pending) return;
				pending = true;
				await add_list_key(joining_list.id, joining_list.key);
				pending = false;
				set_current_list_id(joining_list.id);
				joining_list = {
					id: '',
					key: ''
				};
				goto('/');
			}}
		>
			<label>
				<span>
					<IcRoundGrid3x3 /> List ID
				</span>
				<input bind:value={joining_list.id} />
			</label>
			<label>
				<span>
					<IcBaselineKey /> List Key
				</span>
				<input bind:value={joining_list.key} />
			</label>
			<button disabled={pending || !joining_list.id || !joining_list.key}>
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
	.new-list-buttons {
		display: flex;
		align-items: stretch;
		justify-content: center;
		flex-direction: column;
		gap: 2em;
	}

	:global(.new-list-buttons > button, a) {
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
