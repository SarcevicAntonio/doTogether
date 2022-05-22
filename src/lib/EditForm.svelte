<script>
	import { createEventDispatcher } from 'svelte';
	import IcBaseline360 from '~icons/ic/baseline-360';
	import IcRoundAlarm from '~icons/ic/round-alarm';
	import IcRoundCloudUpload from '~icons/ic/round-cloud-upload';
	import IcRoundDescription from '~icons/ic/round-description';
	import IcRoundLocalOffer from '~icons/ic/round-local-offer';

	export let item;

	const dispatch = createEventDispatcher();
</script>

<h2>Edit Item: "{item.label}"</h2>
<form
	on:submit|preventDefault={() => {
		dispatch('edit', item);
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
	<button> <IcRoundCloudUpload /> Save </button>
</form>

<style>
	span {
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
