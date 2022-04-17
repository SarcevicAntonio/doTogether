<script>
	import EditForm from '$lib/EditForm.svelte';
	import { db } from '$lib/firebase';
	import { Dialog } from 'as-comps';
	import { onValue, ref, set } from 'firebase/database';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';

	const dbRef = ref(db, 'todos');
	let items = []; //$objectStore?.snapshot.val();
	onValue(dbRef, (snapshot) => {
		items = snapshot.val();
	});

	let label = 'test';
	let desc = '';
	let days = 7;
	$: nextId = items?.length + 1;
</script>

<h1>Todo</h1>
<Dialog triggerLabel="Add Item" let:toggle>
	<h2>Add Item</h2>
	<form
		on:submit|preventDefault={() => {
			items = [...items, { label, desc, days, remaining: 0, id: nextId }];
			set(dbRef, items);
			toggle();
		}}
	>
		<label>
			Label
			<input bind:value={label} />
		</label>
		<br />
		<label>
			Description
			<textarea bind:value={desc} />
		</label>
		<br />
		<label>
			Return in
			<input type="number" bind:value={days} />
			days
		</label>

		<button> ➕ Add </button>
	</form>
</Dialog>

{#if items?.length}
	<ul>
		{#each items.sort((a, b) => a.remaining - b.remaining) as item (item.id)}
			{@const done = item.remaining > 0}
			<li animate:flip in:fly={{ x: -40 }} out:fade class:done>
				{item.label}
				<Dialog triggerLabel="ℹ️">
					{#if item.desc}
						<p>{item.desc}</p>
					{/if}
					<ul>
						<li>Returns every {item.days} days.</li>
						{#if done}
							<li>✅ Done! {item.remaining} days remaining to next return.</li>
						{:else}
							<li>⚠️ Currently todo!</li>
						{/if}
					</ul>
					<Dialog triggerLabel="⚙️ Settings" let:toggle>
						<EditForm
							{item}
							on:edit={({ detail: newItem }) => {
								item = newItem;
								set(dbRef, items);
								toggle();
							}}
						/>
					</Dialog>
				</Dialog>
				{#if !done}
					<button
						on:click={() => {
							item.remaining = item.days;
							set(dbRef, items);
						}}
					>
						✅ Done
					</button>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<button
	on:click={() => {
		items.forEach((item) => {
			item.remaining--;
			console.log(item);
		});
		set(dbRef, items);
	}}
>
	next day, cron 0 0 * * *
</button>

<pre>{JSON.stringify(items, null, 2)}</pre>

<style>
	.done {
		text-decoration: line-through;
	}
</style>
