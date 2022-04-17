<script>
	import { createEventDispatcher } from 'svelte';

	export let item;

	const dispatch = createEventDispatcher();
</script>

<h2>Edit Item</h2>
<form
	on:submit|preventDefault={() => {
		dispatch('edit', item);
	}}
>
	<label>
		Label
		<input bind:value={item.label} />
	</label>
	<br />
	<label>
		Description
		<textarea bind:value={item.desc} />
	</label>
	<br />
	<label>
		Return in
		<input type="number" bind:value={item.days} />
		days
	</label>
	<br />
	<label>
		<input type="number" bind:value={item.remaining} />
		days remaining
	</label>
	<br />
	<button> 💾 Save </button>
</form>
