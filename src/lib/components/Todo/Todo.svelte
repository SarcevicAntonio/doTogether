<script lang="ts">
	import Accordion from '$lib/components/Accordion.svelte'
	import { calc_remaining, type Task } from '$lib/task'
	import { Dialog } from 'as-comps'
	import { createEventDispatcher } from 'svelte'
	import IcBaseline360 from '~icons/ic/baseline-360'
	import IcRoundAlarm from '~icons/ic/round-alarm'
	import IcRoundArrowBack from '~icons/ic/round-arrow-back'
	import IcRoundDeleteForever from '~icons/ic/round-delete-forever'
	import IcRoundDone from '~icons/ic/round-done'
	import Form from '../Form.svelte'
	import MarkAsDone from './MarkAsDone.svelte'

	const dispatch = createEventDispatcher()

	export let item: Task
	$: remaining = calc_remaining(item)
	$: done = remaining > 0

	let width: number
	$: is_very_narrow = width < 320
</script>

<svelte:window bind:innerWidth={width} />

<Accordion let:toggle={toggleParent}>
	<div class="item" slot="trigger-label">
		<h2 class="item-label" class:done>
			{item.label}
		</h2>
		{#if !is_very_narrow}
			<MarkAsDone {item} on:change />
		{/if}
	</div>
	{#if item.desc}
		<p class="desc">{item.desc}</p>
	{/if}
	<p><IcBaseline360 /> Returns every {item.days} day{item.days !== 1 ? 's' : ''}.</p>
	{#if done}
		<p>
			<IcRoundDone /> Done! {remaining} day{remaining !== 1 ? 's' : ''} remaining to next return.
		</p>
	{:else}
		<p>
			<IcRoundAlarm /> Currently todo.
			{#if remaining < 0}
				{Math.abs(remaining)} day{Math.abs(remaining) !== 1 ? 's' : ''} overdue!
			{/if}
		</p>
	{/if}

	<div class="flx jcsb">
		<Dialog let:toggle triggerProps={{ class: 'delete-btn' }}>
			<svelte:fragment slot="trigger-label">
				<IcRoundDeleteForever />
			</svelte:fragment>
			<h2 class="close-btn-pad">Are you Sure?</h2>
			<p>Deleting the Item "{item.label}" can't be undone.</p>
			<div class="flx jcsb">
				<button on:click={toggle}><IcRoundArrowBack /> Do nothing</button>
				<button
					on:click={() => {
						dispatch('delete')
						toggle()
						toggleParent()
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
				dispatch('change', newItem)
				toggleParent()
			}}
		/>
		{#if is_very_narrow}
			<MarkAsDone {item} on:change />
		{/if}
	</div>
</Accordion>

<style>
	h2 {
		display: inline;
	}
	.done {
		text-decoration: line-through;
		opacity: 0.8;
	}

	.item {
		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding-left: 0.5em;
		width: calc(100% - 1.06em);
	}

	.item-label {
		font-size: 1.2em;
		font-weight: 500;
	}

	div :global(.delete-btn) {
		margin-right: 0.2em;
	}

	p {
		margin-block-start: 0em;
	}
</style>
