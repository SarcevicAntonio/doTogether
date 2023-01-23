/**
 * Creates `longpress` event when mousedown above `duration` milliseconds.
 *
 * @example
 * ```svelte
 * <button use:longpress={duration} on:longpress={() => alert("longpress")}>
 * press and hold
 * </button>
 *```
 * Demo: https://svelte.dev/tutorial/adding-parameters-to-actions
 * https://github.com/sw-yx/svelte-actions/blob/main/src/longpress.ts
 */
export const longpress = (node, duration = 2000) => {
	let timer: number;

	function handle_mouse_down() {
		node.dispatchEvent(new CustomEvent('longpress_start'));
		timer = window.setTimeout(() => {
			node.dispatchEvent(new CustomEvent('longpress'));
		}, duration);
	}

	function handle_mouse_up() {
		node.dispatchEvent(new CustomEvent('longpress_cancel'));
		clearTimeout(timer);
	}

	node.addEventListener('mousedown', handle_mouse_down);
	document.addEventListener('mouseup', handle_mouse_up);

	return {
		update(newDuration) {
			handle_mouse_up();
			duration = newDuration;
		},
		destroy() {
			handle_mouse_up();
			node.removeEventListener('mousedown', handle_mouse_down);
			node.removeEventListener('mouseup', handle_mouse_up);
		}
	};
};
