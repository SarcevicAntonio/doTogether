<script>
	import { Dialog } from 'as-comps';
	import { createEventDispatcher } from 'svelte';
	import IcBaseline360 from '~icons/ic/baseline-360';
	import IcRoundAdd from '~icons/ic/round-add';
	import IcRoundAlarm from '~icons/ic/round-alarm';
	import IcRoundCloudUpload from '~icons/ic/round-cloud-upload';
	import IcRoundDescription from '~icons/ic/round-description';
	import IcRoundEdit from '~icons/ic/round-edit';
	import IcRoundLocalOffer from '~icons/ic/round-local-offer';
	const dispatch = createEventDispatcher();

	let defaultItem = {
		label: '',
		desc: '',
		days: 7,
		done: new Date().toISOString().substring(0, 10) // TODO: replace with last done
	};

	export let item = defaultItem;
	export let edit = false;
</script>

<Dialog let:toggle>
	<svelte:fragment slot="trigger-label">
		{#if edit}
			<IcRoundEdit /> Edit
		{:else}
			<IcRoundAdd /> Add
		{/if}
	</svelte:fragment>
	<h2>
		{#if edit}
			<IcRoundEdit /> Edit
		{:else}
			<IcRoundAdd /> Add
		{/if}
		Item
	</h2>
	<form
		on:submit|preventDefault={() => {
			toggle();
			dispatch('edit', item);
			item = defaultItem;
		}}
	>
		<label>
			<span><IcRoundLocalOffer /> Label</span>
			<input bind:value={item.label} />
		</label>
		<label>
			<span><IcRoundDescription /> Description</span>
			<textarea bind:value={item.desc} />
		</label>
		<label>
			<span><IcBaseline360 /> Days to return after</span>
			<input type="number" bind:value={item.days} />
		</label>
		<label>
			<span><IcRoundAlarm /> Days remaining</span>
			<input type="number" bind:value={item.remaining} />
		</label>
		<button><IcRoundCloudUpload /> Save</button>
	</form>
</Dialog>

<style>
	span,
	h2 {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	h2 {
		margin-bottom: 1em;
	}

	span {
		margin-bottom: 0.25em;
	}
</style>
