import { Partisipants, Trip } from '@/models';
import { TripFormInfo, TripSights } from '@/models/trip';

export const adoptForSend = (trip: Trip): TripFormInfo => {
	const { title, description, sights } = trip;
	const responseDays: Array<TripSights> = [];
	if (sights) {
		sights.forEach(sight => {
			responseDays.push({ id: Number(sight.id), day: 0 });
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
	const { title, description } = trip;
	return {
		title,
		description,
		sights: [{ id: 1, day: -1 }], // fake data, not rendering
	};
};

export const adoptPartisipants = (users: Array<number>): Array<Partisipants> => {
	const partisipants: Array<Partisipants> = [];
	users.forEach(user => {
		partisipants.push({id: user, profilePhoto: "/image/7b205eb741a49105fcd425910545cc79.jpeg"})
	})
	return partisipants
}

