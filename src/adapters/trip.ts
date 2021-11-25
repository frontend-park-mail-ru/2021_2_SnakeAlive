import { Trip } from '@/models';
import { TripFormInfo, TripSightId } from '@/models/trip';

export const adoptForSend = (trip: Trip): TripFormInfo => {
	const { title, description, days } = trip;



	const responseDays: Array<TripSightId> = [];
	// let i = 0;
	if (days) {
		days.forEach(day => {
			responseDays.push({
				id: Number(day.sight.id),
				day: day.day
			})
		});
	}

	return {
		title,
		description,
		sights: responseDays
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
