import { Trip } from '@/models';
import { TripFormInfo, TripSights } from '@/models/trip';

export const adoptForSend = (trip: Trip): TripFormInfo => {
	const { title, description, sights } = trip;
	const responseDays: Array<TripSights> = [];
	let i = 0;
	if (sights) {
		sights.forEach(sight => {
			responseDays.push({ id: Number(sight.id), day: 0 });
			i += 1;
		});
	} else {
		responseDays.push({ id: 1, day: 0 });
	}
	return {
		title,
		description,
		sights: responseDays,
	};
};

export const adoptForCreate = (trip: Trip): TripFormInfo => {
	const { title, description, sights } = trip;
	const responseDays: Array<TripSights> = [];
	let i = 0;
	return {
		title,
		description,
		sights: [{ id: 1, day: -1 }], //fake data, not rendering
	};
};
