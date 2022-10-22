<script>
	import { Dialog } from 'as-comps';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundDeleteForever from '~icons/ic/round-delete-forever';
	import IcRoundSettings from '~icons/ic/round-settings';
	import Form from './Form.svelte';
	import { calc_remaining } from './todo';
	import Todo from './Todo.svelte';

	const dispatch = createEventDispatcher();

	export let room;

	$: todos = room.todos;
</script>

{#if todos}
	<ol class="mt2">
		{#each todos.sort((a, b) => calc_remaining(a) - calc_remaining(b)) as item (item.id)}
			<li animate:flip>
				<Todo
					{item}
					on:delete={() => {
						todos = todos.filter((i) => i.id !== item.id);
						dispatch('todos-change', todos);
					}}
					on:change={({ detail: newItem }) => {
						item = newItem;
						dispatch('todos-change', todos);
					}}
				/>
			</li>
		{/each}
	</ol>
{/if}

<div class="flx jcsb mt2">
	<Dialog let:toggle={toggleParent}>
		<svelte:fragment slot="trigger-label">
			<IcRoundSettings /> Room Settings
		</svelte:fragment>
		<h2>Settings for "{room.label}"</h2>
		<Dialog let:toggle>
			<svelte:fragment slot="trigger-label">
				<IcRoundDeleteForever /> Delete
			</svelte:fragment>
			<h2>Are you Sure?</h2>
			<p>Deleting the room "{room.label}" can't be undone.</p>
			<div class="flx jcsb">
				<button on:click={toggle}>
					<IcRoundArrowBack /> Do nothing
				</button>
				<button
					on:click={() => {
						toggle();
						toggleParent();
						dispatch('delete');
					}}
				>
					<IcRoundDeleteForever /> Delete
				</button>
			</div>
		</Dialog>
	</Dialog>

	<Form
		on:edit={({ detail: newItem }) => {
			todos = [...todos, { ...newItem, id: crypto.randomUUID() }];
			dispatch('todos-change', todos);
		}}
	/>
</div>

<style>
	ul {
		list-style: none;
		text-align: center;
		padding: 0;
	}
</style>
