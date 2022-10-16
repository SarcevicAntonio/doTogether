<script>
	import { goto } from '$app/navigation';
	import { rooms } from '$lib/stores/rooms';
	import { current_room } from './stores/current-room';

	const handleChange = (e) => {
		const val = e.target.value;
		if (val.startsWith('#')) {
			goto('/add');
		} else {
			current_room.set(val);
		}
	};
</script>

<pre>
	{JSON.stringify([...$rooms], null, 2)}
</pre>
<select value={$current_room} on:change={handleChange}>
	{#each [...$rooms] as [id, room]}
		<option value={id}>{room?.title || JSON.stringify(room)}</option>
	{/each}
	<option value="#ADD">Add a new room</option>
</select>

<!-- 
<button on:click={() => (open = !open)}>
	{#if $current_room}
		{$rooms.get($current_room).title}
	{:else}
		select a room ...
	{/if}
	<IcDropDown />
</button>

{#if open}
	{#each [...$rooms] as [id, room]}
		<button
			on:click={() => {
				current_room.set(id);
				open = false;
			}}>{room.title}</button
		>
	{/each}
{/if} -->
<style>
	select {
		width: 100%;
	}
</style>
