<script>
	import EditForm from '$lib/EditForm.svelte';
	import { db } from '$lib/firebase';
import Logo from '$lib/Logo.svelte';
	import { Dialog } from 'as-comps';
	import { onValue, ref, set } from 'firebase/database';
	import { flip } from 'svelte/animate';

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

<div class="jcsb ais mb2">
	<h1><Logo/> doTogether</h1>
</div>

{#if items?.length}
	<ul>
		{#each items.sort((a, b) => a.remaining - b.remaining) as item (item.id)}
			{@const done = item.remaining > 0}
			<li animate:flip>
				<span class="item" class:done>
					<Dialog triggerLabel="ℹ️" let:toggle={toggleParent}>
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
						<div class="flx jcsb">
							<Dialog triggerLabel="🗑️" let:toggle>
								<h2>Are you Sure?</h2>
								<p>Deleting the item "{item.label}" can't be undone.</p>
								<div class="flx jcsb">
									<button on:click={toggle}>🔙 Do nothing</button>
									<button
										on:click={() => {
											items = items.filter((i) => i.id !== item.id);
											set(dbRef, items);
										}}>🗑️ Delete</button
									>
								</div>
							</Dialog>
							<Dialog triggerLabel="⚙️ Settings" let:toggle>
								<EditForm
									{item}
									on:edit={({ detail: newItem }) => {
										item = newItem;
										set(dbRef, items);
										toggle();
										toggleParent();
									}}
								/>
							</Dialog>
						</div>
					</Dialog>
					<span class="item-label">
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
				{:else}
					<button disabled>⏰ {item.remaining} Days</button>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<div class="flx jce mt2">
	<Dialog triggerLabel="➕ Add Item" let:toggle>
		<h2>Add Item</h2>
		<form
			on:submit|preventDefault={() => {
				items = [...items, { label, desc, days, remaining: 0, id: nextId }];
				set(dbRef, items);
				label = '';
				desc = '';
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

<style>
	h1 {
		text-align: center;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 1.25em;
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
		font-weight: 500;
	}

	.done {
		opacity: 0.8;
	}
</style>
