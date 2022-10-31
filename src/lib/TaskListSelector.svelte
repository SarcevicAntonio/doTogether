<script>
	import { create_list, task_list_map } from '$lib/stores/task_lists';
	import { Dialog } from 'as-comps';
	import IcRoundListAlt from '~icons/ic/round-list-alt';
	import IcRoundLocalOffer from '~icons/ic/round-local-offer';
	import IcRoundPlaylistAdd from '~icons/ic/round-playlist-add';
	import { current_list_id, set_current_list_id } from './stores/current_list';
	import EosIconsThreeDotsLoading from '~icons/eos-icons/three-dots-loading';
	let selectEl;

	const handleChange = () => {
		const val = selectEl.value;
		switch (val) {
			case '#CREATE':
				isOpen = true;
				break;
			case '#---':
				selectEl.value = $current_list_id;
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
	<label for="list" class="list-selector">
		<IcRoundListAlt /> List:
		<select id="list" value={$current_list_id} on:change={handleChange} bind:this={selectEl}>
			{#each [...$task_list_map] as [id, list]}
				<option value={id}>{list?.label || id}</option>
			{/each}
			<option value="#---">-------------</option>
			<option value="#CREATE">[ + Create List ]</option>
		</select>
	</label>
{/if}

<Dialog
	includedTrigger={false}
	bind:isOpen
	let:toggle
	on:dismiss={() => {
		selectEl.value = $current_list_id;
	}}
>
	<svelte:fragment slot="trigger-label">
		<IcRoundPlaylistAdd />
		Create New List
	</svelte:fragment>
	<h2 class="close-btn-pad">
		<IcRoundPlaylistAdd />
		Create New List
	</h2>
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
			<span class="inline-icon">
				<IcRoundLocalOffer />
				List Label
			</span>
			<input bind:value={new_list_label} />
		</label>
		<button disabled={pending}>
			<IcRoundPlaylistAdd />
			{#if !pending}
				Create New List
			{:else}
				<EosIconsThreeDotsLoading />
			{/if}
		</button>
	</form>
</Dialog>

<style>
	h2,
	.inline-icon {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.25em;
	}

	h2 {
		margin-bottom: 1em;
	}

	select {
		flex-grow: 1;
	}

	.list-selector {
		flex-direction: row;
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.25em;
		font-size: 1.25rem;
	}
</style>
