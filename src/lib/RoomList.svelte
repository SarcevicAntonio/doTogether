<script>
	import { goto } from '$app/navigation';
	import { rooms } from '$lib/stores/rooms';
	import IcRoundListAlt from '~icons/ic/round-list-alt';
	import { current_room } from './stores/current-room';

	const handleChange = (e) => {
		const val = e.target.value;
		switch (val) {
			case '#ADD':
				goto('/add');
				break;
			case '#---':
				e.target.value = $current_room;
				break;
			default:
				current_room.set(val);
				break;
		}
	};
</script>

<label for="room">
	<span> <IcRoundListAlt /> Current List </span>
	<select id="room" value={$current_room} on:change={handleChange}>
		{#each [...$rooms] as [id, room]}
			<option value={id}>{room?.label || JSON.stringify(room)}</option>
		{/each}
		<option value="#---">-------------</option>
		<option value="#ADD">[ + Add List ]</option>
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
