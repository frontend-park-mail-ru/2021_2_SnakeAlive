import { Trip } from '@/models';
import { TripFormInfo } from '@/models/trip';

export const adoptForSend = (trip: Trip): TripFormInfo => {
	const { title, description, days } = trip;
	const responseDays: Array<Array<Record<string, number>>> = [[]];
	let i = 0;
	if (days) {
		days.forEach(day => {
			day.forEach(sight => {
				responseDays[0].push({ id: Number(sight.id) });
			});
			i += 1;
		});
	}

	return {
		title,
		description,
		days: responseDays,
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
