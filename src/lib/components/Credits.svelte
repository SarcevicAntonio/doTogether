<script>
	import { Dialog } from 'as-comps'
	import deps from '$lib/dependency-report.json'
	import { confetti } from '$lib/confetti'
	export let isOpen = false
</script>

<Dialog
	bind:isOpen
	includedTrigger={false}
	style="display: flex; flex-direction: column; gap: 0.5rem; width: 80vw; max-width: 800px;"
>
	<h2 class="headline-3">About doTogether</h2>
	<p>Simple realtime-multiplayer todo list for recurring tasks</p>
	<p>
		Made by <a target="_blank" rel="noreferrer" href="https://www.sarcevic.dev/">
			Antonio Sarcevic
		</a>
	</p>
	<p>
		View the source code on <a href="https://github.com/SarcevicAntonio/doTogether"
			>github.com/SarcevicAntonio/doTogether</a
		>.
	</p>
	<h3 class="headline-5">Made possible thanks to the following open source work</h3>
	<ul>
		{#each deps as dep}
			{@const link = dep.link.replace('git://', 'https://').replace('git+', '')}
			<li>
				<a target="_blank" rel="noreferrer" href={link}>{dep.name}</a>
				<span class="version">@ {dep.installedVersion}</span>
				<span class="license">{dep.licenseType}</span>
			</li>
		{/each}
	</ul>
	<button on:click={confetti}>Random Confetti Button!</button>
</Dialog>

<style>
	ul,
	li,
	h2,
	h3,
	p {
		margin: 0;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		list-style: none;
		border-radius: 0.5em;
		border: 1px solid var(--surface);
		height: 100%;
		padding: 0;
		overflow: auto;
	}

	li {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
	}

	.license {
		margin-left: auto;
	}

	@media only screen and (min-width: 1000px) {
		li {
			flex-direction: row;
			gap: 0.5rem;
			align-items: center;
		}
	}

	li:nth-child(2n) {
		background-color: var(--surface);
	}

	li:last-child {
		border-bottom-right-radius: 0.5em;
		border-bottom-left-radius: 0.5em;
	}

	a {
		background-color: transparent;
		padding: 0;
		display: inline;
	}

	.version {
		font-size: 0.75rem;
		color: var(--md-on-surface-variant);
	}
</style>
