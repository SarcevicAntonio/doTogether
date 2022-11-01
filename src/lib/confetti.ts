import { browser } from '$app/environment';
import JSConfetti from 'js-confetti';

let jsConfetti: JSConfetti;

export const confetti = () => {
	if (browser && !jsConfetti) {
		jsConfetti = new JSConfetti();
	}
	jsConfetti.addConfetti({
		emojis: [
			'🌈',
			'⚡️',
			'💥',
			'✨',
			'💫',
			'👏',
			'🙌',
			'👍',
			'🤟',
			'🥳',
			'🎉',
			'🎊',
			'🌟',
			'🏆',
			'🥇',
			'🎖',
			'🚀',
			'🧹',
			'💨',
			'🛁',
			'🪟',
			'🪠',
			'🌸',
			'🌼',
			'🛏',
			'🥐',
			'🚿',
			'🧽',
			'🪣',
			'🏳️‍🌈'
		]
	});
};
