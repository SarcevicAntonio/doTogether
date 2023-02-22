import { notification } from 'as-comps'

export function share(shareInfo: ShareData, fallbackNotificationText = 'Copied to clipboard.') {
	if (navigator.share) {
		navigator.share(shareInfo)
	} else {
		navigator.clipboard.writeText([shareInfo.text, '', shareInfo.url].join('\n'))
		notification(fallbackNotificationText)
	}
}
