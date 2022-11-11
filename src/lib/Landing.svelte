<script lang="ts">
	import Logo from '$lib/Logo.svelte';
	import { subDays } from 'date-fns';
	import { onMount } from 'svelte';
	import type { Task_List } from './stores/task_lists';
	import TaskList from './TaskList.svelte';

	let task_list: Task_List = {
		key: 'string',
		label: 'string',
		tasks: [
			{
				id: crypto.randomUUID(),
				label: '💨 Vacuum',
				desc: '',
				days: 5,
				done_at: subDays(new Date(), 5).toISOString().substring(0, 10)
			},
			{
				id: crypto.randomUUID(),
				label: '🛏 Change bedsheets',
				desc: '',
				days: 25,
				done_at: subDays(new Date(), 25).toISOString().substring(0, 10)
			},
			{
				id: crypto.randomUUID(),
				label: '🪟 Clean windows',
				desc: '',
				days: 45,
				done_at: subDays(new Date(), 45).toISOString().substring(0, 10)
			}
		]
	};

	function mark_first_as_done() {
		// works because .sort is in-place
		task_list.tasks[0].done_at = new Date().toISOString().substring(0, 10);
	}

	onMount(() => {
		let timeout = setTimeout(() => {
			mark_first_as_done();
			timeout = setTimeout(() => {
				mark_first_as_done();
			}, 3000);
		}, 5000);
		return () => clearTimeout(timeout);
	});
</script>

<section>
	<h2>Welcome to <Logo />doTogether!</h2>
	<p>
		<span class="brand">
			<b>doTogether</b>
		</span>
		helps you keep track of stuff you have get done via
		<b>a List of recurring Tasks</b>. You can try it out by marking a Task below as done.
	</p>
	<TaskList {task_list} demo />

	<p>
		Each <b>Task</b> has a certain number of days it takes to recur. When you mark a Task as done,
		it will recur after that set amount of days. <b>Lists</b> contain Tasks and can be shared with other
		people, so you can work on Tasks together. The List is ordererd by the remaining / overdue days of
		each Task.
	</p>
	<p>
		The app is build to be as <b>simple as possible</b>, so you can focus on getting stuff done
		instead of figuring out all the features. It's also build to be used with multiple people.
		<b> Realtime data</b>
		means the Lists are always in sync and up to date, but you can of course also use the app by yourself.
		You can create a List for your shared home chores and one for your daily habits!
	</p>
	<p>
		The app is completely
		<a href="https://github.com/SarcevicAntonio/doTogether">open source</a>
		and free to use. To get started, login with your Google account below. We don't save any personal
		data.
	</p>
</section>

<style>
	h2,
	h3 {
		display: flex;
		align-items: center;
	}

	:global(h2 svg) {
		margin-inline-start: 0.25em;
	}

	section {
		padding-inline: 1em;
	}

	p {
		display: block;
	}

	a {
		background-color: transparent;
		display: inline;
		padding: 0;
	}
</style>
