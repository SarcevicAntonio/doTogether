<script>
	import { goto } from '$app/navigation';
	import { rooms } from '$lib/stores/rooms';
	import { current_room } from './stores/current-room';
	import IcRoundHouse from '~icons/ic/round-house';

	const handleChange = (e) => {
		const val = e.target.value;
		if (val.startsWith('#ADD')) {
			goto('/add');
		} else {
			current_room.set(val);
		}
	};
</script>

<label for="room">
	<span> <IcRoundHouse /> Current Room </span>
	<select id="room" value={$current_room} on:change={handleChange}>
		{#each [...$rooms] as [id, room]}
			<option value={id}>{room?.label || JSON.stringify(room)}</option>
		{/each}
		<option value="#ADD">+ Add a new room</option>
	</select>
</label>

<!-- 
<button on:click={() => (open = !open)}>
	{#if $current_room}
		{$rooms.get($current_room).label}
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
			}}>{room.label}</button
		>
	{/each}
{/if} -->
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
