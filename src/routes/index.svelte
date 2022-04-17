<script>
	import EditForm from '$lib/EditForm.svelte';
	import { db } from '$lib/firebase';
	import { Dialog } from 'as-comps';
	import { onValue, ref, set } from 'firebase/database';
	import { flip } from 'svelte/animate';
	import { fade, fly } from 'svelte/transition';

	const dbRef = ref(db, 'todos');
	let items = [];
	onValue(dbRef, (snapshot) => {
		items = snapshot.val();
	});

	let label = '';
	let desc = '';
	let days = 7;
	$: nextId = items?.length + 1;
</script>

<div class="sb aic">
	<h1>doTogether</h1>
	<Dialog triggerLabel="➕ Add Item" let:toggle>
		<h2>Add Item</h2>
		<form
			on:submit|preventDefault={() => {
				items = [...items, { label, desc, days, remaining: 0, id: nextId }];
				set(dbRef, items);
				label = '';
				desc = ''
				days = 7;
				toggle();
			}}
		>
			<label>
				<span>Label</span>
				<input bind:value={label} />
			</label>
			<label>
				<span>Description</span>
				<textarea bind:value={desc} rows="6" />
			</label>
			<label>
				<span>Days to return after</span>
				<input type="number" bind:value={days} />
			</label>
			<button> ➕ Add </button>
		</form>
	</Dialog>
</div>

{#if items?.length}
	<ul>
		{#each items.sort((a, b) => a.remaining - b.remaining) as item (item.id)}
			{@const done = item.remaining > 0}
			<li animate:flip in:fly={{ x: -40 }} out:fade>
				<span class="item">
					<Dialog triggerLabel="ℹ️">
						<h2>{item.label}</h2>
						{#if item.desc}
							<p class="desc">{@html item.desc}</p>
						{/if}
						<p>🔄 Returns every {item.days} days.</p>
						{#if done}
							<p>✅ Done! {item.remaining} days remaining to next return.</p>
						{:else}
							<p>⚠️ Currently todo!</p>
						{/if}
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
					<span class="item-label" class:done>
						{item.label}
					</span>
				</span>
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

<div class="add-item-container">
	<Dialog triggerLabel="➕ Add Item" let:toggle>
		<h2>Add Item</h2>
		<form
			on:submit|preventDefault={() => {
				items = [...items, { label, desc, days, remaining: 0, id: nextId }];
				set(dbRef, items);
				toggle();
			}}
		>
			<label>
				<span>Label</span>
				<input bind:value={label} />
			</label>
			<label>
				<span>Description</span>
				<textarea bind:value={desc} rows="6" />
			</label>
			<label>
				<span>Days to return after</span>
				<input type="number" bind:value={days} />
			</label>
			<button> ➕ Add </button>
		</form>
	</Dialog>
</div>

<style>
	ul {
		display: flex;
		flex-direction: column;
		gap: 1em;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		display: flex;
		justify-content: space-between;
	}

	.desc {
		white-space: pre-line;
	}

	.item {
		display: flex;
		gap: 1em;
	}

	.item-label {
		font-size: 1.2em;
	}

	.add-item-container {
		margin-top: 1em;
		display: flex;
		justify-content: end;
	}
	.done {
		text-decoration: line-through;
	}
</style>
