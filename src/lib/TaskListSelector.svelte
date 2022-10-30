<script>
	import { create_list, task_list_map } from '$lib/stores/task_lists';
	import { Dialog } from 'as-comps';
	import IcRoundListAlt from '~icons/ic/round-list-alt';
	import IcRoundLocalOffer from '~icons/ic/round-local-offer';
	import IcRoundPlaylistAdd from '~icons/ic/round-playlist-add';
	import { current_list_id, set_current_list_id } from './stores/current_list';

	const handleChange = (e) => {
		const val = e.target.value;
		switch (val) {
			case '#CREATE':
				isOpen = true;
				break;
			case '#---':
				e.target.value = $current_list_id;
				break;
			default:
				set_current_list_id(val);
				break;
		}
	};

	let new_list_label = '';
	let pending = false;
	let isOpen = false;
</script>

{#if $task_list_map}
	<label for="list">
		<span> <IcRoundListAlt /> Current List </span>
		<select id="list" value={$current_list_id} on:change={handleChange}>
			{#each [...$task_list_map] as [id, list]}
				<option value={id}>{list?.label || id}</option>
			{/each}
			<option value="#---">-------------</option>
			<option value="#CREATE">[ + Create List ]</option>
		</select>
	</label>
{/if}

<Dialog includedTrigger={false} bind:isOpen let:toggle>
	<svelte:fragment slot="trigger-label">
		<IcRoundPlaylistAdd />
		Create New List
	</svelte:fragment>
	<form
		on:submit|preventDefault={async () => {
			if (pending) return;
			pending = true;
			const { id } = await create_list(new_list_label);
			new_list_label = '';
			pending = false;
			set_current_list_id(id);
			toggle();
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

<style>
	select {
		width: 100%;
	}
	span {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.25em;
	}
</style>
