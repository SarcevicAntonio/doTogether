<script>
	import EditForm from '$lib/EditForm.svelte';
	import { db } from '$lib/firebase';
	import { Dialog } from 'as-comps';
	import { onValue, ref, set } from 'firebase/database';
	import { flip } from 'svelte/animate';
	import IcBaseline360 from '~icons/ic/baseline-360';
	import IcRoundAdd from '~icons/ic/round-add';
	import IcRoundAlarm from '~icons/ic/round-alarm';
	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundDeleteForever from '~icons/ic/round-delete-forever';
	import IcRoundDone from '~icons/ic/round-done';
	import IcRoundInfo from '~icons/ic/round-info';
	import IcRoundSettings from '~icons/ic/round-settings';

	const dbRef = ref(db, 'todos');
	let items;
	onValue(dbRef, (snapshot) => {
		items = snapshot.val();
	});

	let label = '';
	let desc = '';
	let days = 7;
	$: nextId = items?.length + 1;
</script>

<main>
	{#if items}
		<ol>
			{#each items.sort((a, b) => a.remaining - b.remaining) as item (item.id)}
				{@const done = item.remaining > 0}
				<li animate:flip>
					<span class="item" class:done>
						<Dialog let:toggle={toggleParent}>
							<svelte:fragment slot="trigger-label">
								<IcRoundInfo />
							</svelte:fragment>
							<h2>{item.label}</h2>
							{#if item.desc}
								<p class="desc">{@html item.desc}</p>
							{/if}
							<p><IcBaseline360 /> Returns every {item.days} day{item.days !== 1 ? 's' : ''}.</p>
							{#if done}
								<p>
									<IcRoundDone /> Done! {item.remaining} day{item.remaining !== 1 ? 's' : ''} remaining
									to next return.
								</p>
							{:else}
								<p>
									<IcRoundAlarm /> Currently todo. {#if item.remaining < 0}
										{Math.abs(item.remaining)} day{Math.abs(item.remaining) !== 1 ? 's' : ''} overdue!
									{/if}
								</p>
							{/if}
							<div class="flx jcsb">
								<Dialog let:toggle>
									<svelte:fragment slot="trigger-label">
										<IcRoundDeleteForever />
									</svelte:fragment>
									<h2>Are you Sure?</h2>
									<p>Deleting the item "{item.label}" can't be undone.</p>
									<div class="flx jcsb">
										<button on:click={toggle}><IcRoundArrowBack /> Do nothing</button>
										<button
											on:click={() => {
												toggle();
												toggleParent();
												items = items.filter((i) => i.id !== item.id);
												set(dbRef, items);
											}}><IcRoundDeleteForever /> Delete</button
										>
									</div>
								</Dialog>
								<Dialog let:toggle>
									<svelte:fragment slot="trigger-label">
										<IcRoundSettings /> Settings
									</svelte:fragment>
									<EditForm
										{item}
										on:edit={({ detail: newItem }) => {
											toggle();
											toggleParent();
											item = newItem;
											set(dbRef, items);
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
						<Dialog let:toggle>
							<svelte:fragment slot="trigger-label">
								<IcRoundDone /> Done
							</svelte:fragment>
							<h2>Is "{item.label}" really done?</h2>
							<p>The item wil return in {item.days} days.</p>
							<div class="flx jcsb">
								<button on:click={toggle}><IcRoundArrowBack /> Do nothing</button>
								<button
									on:click={() => {
										toggle();
										item.remaining = item.days;
										set(dbRef, items);
									}}
								>
									<IcRoundDone /> Mark as Done
								</button>
							</div>
						</Dialog>
					{:else}
						<button disabled><IcRoundAlarm /> {item.remaining} Days</button>
					{/if}
				</li>
			{/each}
		</ol>
	{:else}
		<h2>Loading ...</h2>
	{/if}

	<div class="flx jce mt2">
		<Dialog let:toggle>
			<svelte:fragment slot="trigger-label">
				<IcRoundAdd /> Add Item
			</svelte:fragment>
			<h2>Add Item</h2>
			<form
				on:submit|preventDefault={() => {
					toggle();
					items = [...items, { label, desc, days, remaining: 0, id: nextId }];
					set(dbRef, items);
					label = '';
					desc = '';
					days = 7;
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
				<button> <IcRoundAdd /> Add </button>
			</form>
		</Dialog>
	</div>
</main>

<style>
	main {
		max-width: 70ch;
		margin: auto;
	}

	h2 {
		text-align: center;
	}

	ol {
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
		align-items: center;
	}

	p {
		display: flex;
		gap: 0.25em;
	}

	.desc {
		white-space: pre-line;
	}

	.item {
		display: flex;
		gap: 1em;
		align-items: center;
	}

	.item-label {
		font-size: 1.2em;
		font-weight: 500;
	}

	.done {
		opacity: 0.8;
	}
</style>
