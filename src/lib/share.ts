import { notification } from 'as-comps'

export function share(shareInfo: ShareData, fallbackNotificationText = 'Copied to clipboard.') {
	if ((navigator as Navigator).share) {
		;(navigator as Navigator).share(shareInfo)
	} else {
		;(navigator as Navigator).clipboard.writeText([shareInfo.text, '', shareInfo.url].join('\n'))
		notification(fallbackNotificationText)
	}
}
