<script>
	import { Dialog } from 'as-comps';
	import { createEventDispatcher } from 'svelte';
	import IcBaseline360 from '~icons/ic/baseline-360';
	import IcRoundAlarm from '~icons/ic/round-alarm';
	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundDeleteForever from '~icons/ic/round-delete-forever';
	import IcRoundDone from '~icons/ic/round-done';
	import IcRoundInfo from '~icons/ic/round-info';
	import Form from './Form.svelte';
	import { calc_remaining, today_string } from './todo';

	const dispatch = createEventDispatcher();

	export let item;
	$: remaining = calc_remaining(item);
	$: done = remaining > 0;
</script>

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
				<IcRoundDone /> Done! {remaining} day{remaining !== 1 ? 's' : ''} remaining to next return.
			</p>
		{:else}
			<p>
				<IcRoundAlarm /> Currently todo. {#if remaining < 0}
					{Math.abs(remaining)} day{Math.abs(remaining) !== 1 ? 's' : ''} overdue!
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
							dispatch('delete');
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
					dispatch('change', newItem);
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
					item.done_at = today_string();
					dispatch('change', item);
				}}
			>
				<IcRoundDone /> Mark as Done
			</button>
		</div>
	</Dialog>
{:else}
	<button disabled><IcRoundAlarm /> {remaining} Days</button>
{/if}
