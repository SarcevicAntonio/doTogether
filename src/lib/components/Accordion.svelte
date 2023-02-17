<script>
	import { slide } from 'svelte/transition'

	export let is_open = false

	function toggle() {
		is_open = !is_open
	}
</script>

<details bind:open={is_open}>
	<summary>
		<slot name="trigger-label" />
	</summary>
	{#if is_open}
		<div transition:slide>
			<slot {toggle} />
		</div>
	{/if}
</details>
