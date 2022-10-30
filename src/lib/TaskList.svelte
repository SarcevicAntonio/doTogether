<script lang="ts">
	import { Dialog } from 'as-comps';
	import { createEventDispatcher, tick } from 'svelte';
	import { flip } from 'svelte/animate';
	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundCloudUpload from '~icons/ic/round-cloud-upload';
	import IcRoundDeleteForever from '~icons/ic/round-delete-forever';
	import IcRoundLocalOffer from '~icons/ic/round-local-offer';
	import IcRoundSettings from '~icons/ic/round-settings';
	import IcRoundShare from '~icons/ic/round-share';
	import Form from './Form.svelte';
	import { share } from './share';
	import { current_list_id } from './stores/current_list';
	import type { Task_List } from './stores/task_lists';
	import { calc_remaining } from './task';
	import Todo from './Todo.svelte';

	const dispatch = createEventDispatcher();

	export let task_list: Task_List;
	export let demo: boolean = false;

	$: if (!task_list.tasks) {
		// firebase realtime database removes keys for empty values
		// so we need to initialize it if it doesn't exist
		task_list.tasks = [];
	}

	function share_task_list() {
		share(
			{
				title: task_list.label,
				text: `Join the "${task_list.label}" List on doTogether:`,
				url: window.location.origin + '/join/' + $current_list_id + '?key=' + task_list.key
			},
			'Copied List invite link to clipboard.'
		);
	}

	function handleNameForm(e: Event) {
		const data = new FormData(e.target as HTMLFormElement);
		task_list.label = data.get('name') as string;
		dispatch('list-change', task_list);
	}
</script>

{#if task_list.tasks}
	<ol class="mt2" class:mb2={demo}>
		{#each task_list.tasks.sort((a, b) => calc_remaining(a) - calc_remaining(b)) as item (item.id)}
			<li animate:flip>
				<Todo
					{item}
					on:delete={() => {
						task_list.tasks = task_list.tasks.filter((i) => i.id !== item.id);
						dispatch('tasks-change', task_list.tasks);
					}}
					on:change={({ detail: newItem }) => {
						item = newItem;
						dispatch('tasks-change', task_list.tasks);
					}}
				/>
			</li>
		{:else}
			No tasks found...
		{/each}
	</ol>
{/if}

{#if !demo}
	<div class="flx jcsb mt2">
		<Dialog let:toggle={toggleParent}>
			<svelte:fragment slot="trigger-label">
				<IcRoundSettings /> List Settings
			</svelte:fragment>
			<h2>Settings for "{task_list.label}"</h2>
			<form on:submit|preventDefault={handleNameForm}>
				<label>
					<span><IcRoundLocalOffer /> Label</span>
					<input name="name" value={task_list.label} />
				</label>
				<button>
					<IcRoundCloudUpload />
					Save Changes
				</button>
			</form>

			<button class="w100p" on:click={share_task_list}>
				<IcRoundShare />
				Share Invite Link
			</button>

			<Dialog let:toggle triggerProps={{ class: 'w100p' }}>
				<svelte:fragment slot="trigger-label">
					<IcRoundDeleteForever /> Delete List
				</svelte:fragment>
				<h2>Are you Sure?</h2>
				<p>Deleting the task_list "{task_list.label}" can't be undone.</p>
				<div class="flx jcsb">
					<button on:click={toggle}>
						<IcRoundArrowBack /> Do nothing
					</button>
					<button
						on:click={async () => {
							dispatch('delete');
							await tick();
							if (task_list) toggleParent();
						}}
					>
						<IcRoundDeleteForever /> Delete
					</button>
				</div>
			</Dialog>
		</Dialog>

		<Form
			on:edit={({ detail: newItem }) => {
				task_list.tasks = [...task_list.tasks, { ...newItem, id: crypto.randomUUID() }];
				dispatch('tasks-change', task_list.tasks);
			}}
		/>
	</div>
{/if}

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
