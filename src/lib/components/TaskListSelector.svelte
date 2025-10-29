<script>
	import { goto, invalidate } from '$app/navigation'
	import { page } from '$app/stores'
	import { Dialog } from 'as-comps'
	import EosIconsThreeDotsLoading from '~icons/eos-icons/three-dots-loading'
	import IcRoundListAlt from '~icons/ic/round-list-alt'
	import IcRoundLocalOffer from '~icons/ic/round-local-offer'
	import IcRoundPlaylistAdd from '~icons/ic/round-playlist-add'
	import { create_list } from '../task_lists'

	export let task_list

	let select_element

	const handleChange = () => {
		const val = select_element.value
		switch (val) {
			case '#CREATE':
				is_open = true
				break
			default:
				goto(val)
				break
		}
	}

	let new_list_label = ''
	let pending = false
	let is_open = false
</script>

{#if task_list}
	<label for="list" class="list-selector">
		<IcRoundListAlt /> List:
		<select
			id="list"
			value={$page.params.list_id}
			on:change={handleChange}
			bind:this={select_element}
		>
			{#each task_list as { id, label }}
				<option value={id}>{label || id}</option>
			{:else}
				<option value={undefined}>-- no list --</option>
			{/each}
			<option value="#CREATE">[ + Create List ]</option>
		</select>
	</label>
{/if}

<Dialog includedTrigger={false} bind:isOpen={is_open} let:toggle>
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
			if (pending || !new_list_label.trim()) return
			pending = true
			const { id } = await create_list(new_list_label)
			pending = false
			await invalidate('data:user')
			goto(id)
			new_list_label = ''
			toggle()
		}}
	>
		<label>
			<span class="inline-icon">
				<IcRoundLocalOffer />
				List Label
			</span>
			<input bind:value={new_list_label} />
		</label>
		<button disabled={pending || !new_list_label.trim()}>
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
		width: 100%;
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
