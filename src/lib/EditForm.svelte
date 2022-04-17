<script>
	import { createEventDispatcher } from 'svelte';

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
		<span>Label</span>
		<input bind:value={item.label} />
	</label>
	<label>
		<span>Description</span>
		<textarea bind:value={item.desc} />
	</label>
	<label>
		<span>Days to return after</span>
		<input type="number" bind:value={item.days} />
	</label>
	<label>
		<span>Days remaining</span>
		<input type="number" bind:value={item.remaining} />
	</label>
	<button> 💾 Save </button>
</form>
