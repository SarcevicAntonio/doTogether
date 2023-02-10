<script lang="ts">
	import { calc_remaining, today_string, type Task } from '$lib/task';
	import { Dialog } from 'as-comps';
	import { differenceInCalendarDays } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import IcBaseline360 from '~icons/ic/baseline-360';
	import IcRoundAlarm from '~icons/ic/round-alarm';
	import IcRoundArrowBack from '~icons/ic/round-arrow-back';
	import IcRoundDone from '~icons/ic/round-done';
	import IcRoundCalendarToday from '~icons/ic/round-calendar-today';
	import { confetti } from '../confetti';
	const dispatch = createEventDispatcher();

	export let item: Task;

	let new_done_at = today_string();
	$: remaining = calc_remaining(item);
	$: next_return = item.days - differenceInCalendarDays(new Date(), new Date(new_done_at));
	$: done = remaining > 0;
</script>

<Dialog let:toggle>
	<svelte:fragment slot="trigger-label">
		{#if done}
			<IcRoundAlarm /> {remaining} Days
		{:else}
			<IcRoundDone /> Done
		{/if}
	</svelte:fragment>
	<h2 class="close-btn-pad">When was "{item.label}" done?</h2>
	<label>
		<span><IcRoundCalendarToday /> Day done</span>
		<input type="date" bind:value={new_done_at} class:today={new_done_at === today_string()} />
	</label>
	<p>
		{#if next_return >= 0}
			<IcBaseline360 /> The item wil return in {next_return} days.
		{:else}
			<IcRoundAlarm /> The item wil be {#if next_return < 0}
				{Math.abs(next_return)} day{Math.abs(next_return) !== 1 ? 's' : ''}
			{/if}
			due!
		{/if}
	</p>
	<div class="flx jcsb g1">
		<button on:click={toggle}><IcRoundArrowBack /> Do nothing</button>
		<button
			on:click={() => {
				toggle();
				item.done_at = new_done_at;
				dispatch('change', item);
				confetti();
			}}
		>
			<IcRoundDone /> Mark as Done
		</button>
	</div>
</Dialog>

<style>
	span,
	h2 {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	h2 {
		margin-bottom: 0.5em;
	}

	span {
		margin-bottom: 0.25em;
	}

	input[type='date'].today:not(:focus, :active):before {
		content: 'Today';
		position: absolute;
		background-color: var(--surface);
		width: 8em;
		height: 1.2em;
	}
</style>
