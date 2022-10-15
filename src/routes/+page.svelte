<script>
	import { db } from '$lib/firebase';
	import Form from '$lib/Form.svelte';
	import { Dialog } from 'as-comps';
	import { onValue, ref, set } from 'firebase/database';
	import { flip } from 'svelte/animate';
	import IcBaseline360 from '~icons/ic/baseline-360';
	import IcRoundAlarm from '~icons/ic/round-alarm';
	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundDeleteForever from '~icons/ic/round-delete-forever';
	import IcRoundDone from '~icons/ic/round-done';
	import IcRoundInfo from '~icons/ic/round-info';

	const dbRef = ref(db, 'rooms');
	let items;

	onValue(
		dbRef,
		(snapshot) => {
			items = snapshot.val() || [];
			console.log(items);
		},
		(error) => console.log(error)
	);
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
											}}
										>
											<IcRoundDeleteForever /> Delete
										</button>
									</div>
								</Dialog>
								<Form
									edit
									{item}
									on:edit={({ detail: newItem }) => {
										toggleParent();
										item = newItem;
										set(dbRef, items);
									}}
								/>
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
		<h2 class="loading">Loading ...</h2>
	{/if}

	<div class="flx jce mt2">
		<Form
			on:edit={({ detail: newItem }) => {
				items = [...items, { ...newItem, id: crypto.randomUUID() }];
				set(dbRef, items);
			}}
		/>
	</div>
</main>

<style>
	main {
		max-width: 70ch;
		margin: auto;
	}

	.loading {
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
