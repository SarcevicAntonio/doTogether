import { differenceInCalendarDays } from 'date-fns';

export const calc_remaining = (item) =>
	item.days - differenceInCalendarDays(new Date(), new Date(item.done_at));

export const today_string = () => new Date().toISOString().substring(0, 10);

export const default_item = {
	label: '',
	desc: '',
	days: 7,
	done_at: today_string()
};
