<script>
	import { Dialog } from 'as-comps';
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundCloudUpload from '~icons/ic/round-cloud-upload';
	import IcRoundDeleteForever from '~icons/ic/round-delete-forever';
	import IcRoundLocalOffer from '~icons/ic/round-local-offer';
	import IcRoundSettings from '~icons/ic/round-settings';
	import Form from './Form.svelte';
	import { calc_remaining } from './todo';
	import Todo from './Todo.svelte';
	import IcRoundShare from '~icons/ic/round-share';

	const dispatch = createEventDispatcher();

	export let room;
</script>

{#if room.todos}
	<ol class="mt2">
		{#each room.todos.sort((a, b) => calc_remaining(a) - calc_remaining(b)) as item (item.id)}
			<li animate:flip>
				<Todo
					{item}
					on:delete={() => {
						room.todos = room.todos.filter((i) => i.id !== item.id);
						dispatch('todos-change', room.todos);
					}}
					on:change={({ detail: newItem }) => {
						item = newItem;
						dispatch('todos-change', room.todos);
					}}
				/>
			</li>
		{/each}
	</ol>
{/if}

<div class="flx jcsb mt2">
	<Dialog let:toggle={toggleParent}>
		<svelte:fragment slot="trigger-label">
			<IcRoundSettings /> List Settings
		</svelte:fragment>
		<h2>Settings for "{room.label}"</h2>
		<form
			on:submit|preventDefault={(e) => {
				const data = new FormData(e.target);
				room.label = data.get('name');
				dispatch('room-change', room);
				console.log('room', room);
			}}
		>
			<label>
				<span><IcRoundLocalOffer /> Label</span>
				<input name="name" value={room.label} />
			</label>
			<button>
				<IcRoundCloudUpload />
				Save Changes
			</button>
		</form>

		<button class="w100p">
			<IcRoundShare />
			Share Invite Link
		</button>

		<Dialog let:toggle triggerProps={{ class: 'w100p' }}>
			<svelte:fragment slot="trigger-label">
				<IcRoundDeleteForever /> Delete List
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
			room.todos = [...room.todos, { ...newItem, id: crypto.randomUUID() }];
			dispatch('todos-change', room.todos);
		}}
	/>
</div>

<style>
	span {
		display: flex;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.25em;
		margin-top: 1em;
	}

	button {
		margin-bottom: 1em;
	}
</style>
