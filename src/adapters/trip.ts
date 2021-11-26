import { Trip } from '@/models';
import { TripFormInfo, TripSights } from '@/models/trip';

export const adoptForSend = (trip: Trip): TripFormInfo => {
	const { title, description, sights } = trip;
	const responseDays: Array<TripSights> = [];
	let i = 0;
	// if (sights) {
	// 	sights.forEach(sights => {
	// 		// sights.forEach(() => {
	// 		// 	responseDays[0].push({ id: Number(sights.id) });
	// 		// });
	// 		responseDays[0].push({ id: Number(sights.id) });
	// 		i += 1;
	// 	});
	// }
	responseDays.push({id: 1, day: 1})
	return {
		title,
		description,
		sights: responseDays,
	};
};

// export const adoptForSendRemovePlace = (trip: Trip, sightToRemove: sightToTrip): TripFormInfo => {
// 	const { title, description, days } = trip;
// 	const responseDays: Array<Array<Record<string, number>>> = [[]];
//
// 	let i = 0;
// 	if (days) {
// 		days.forEach((day)=>{
// 			day.forEach((sight) => {
// 				responseDays[i].push({ "id": Number(sight.id) })
// 			})
// 			i += 1;
// 		})
// 	}
//
// 	responseDays[sightToRemove.day].filter((sight) =>
// 		sight.id !== sightToRemove.sightId
// 	);
//
// 	return {
// 		title,
// 		description,
// 		days: responseDays
// 	};
// }
