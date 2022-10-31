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
	import { default_item } from './task';
	const dispatch = createEventDispatcher();

	export let item = structuredClone(default_item);
	export let edit = false;
</script>

<Dialog let:toggle>
	<svelte:fragment slot="trigger-label">
		{#if edit}
			<IcRoundEdit /> Edit
		{:else}
			<IcRoundAdd /> Create Task
		{/if}
	</svelte:fragment>
	<h2 class="close-btn-pad">
		{#if edit}
			<IcRoundEdit /> Edit Task
		{:else}
			<IcRoundAdd /> Create Task
		{/if}
	</h2>
	<form
		on:submit|preventDefault={() => {
			toggle();
			dispatch('edit', item);
			item = structuredClone(default_item);
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
			<span><IcRoundAlarm /> Last time done</span>
			<input type="date" bind:value={item.done_at} />
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
