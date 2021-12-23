import { Album, GotAlbumInterface, Partisipants, Trip } from '@/models';
import { TripFormInfo, TripSights } from '@/models/trip';

import avatarPath from '../../image/test.webp';
import { isStdAvatar } from '@/adapters/profile';
import { storage } from '@/storage';

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
		partisipants.push({ id: user, avatarPath: '/image/7b205eb741a49105fcd425910545cc79.jpeg' });
	});
	return partisipants;
};

export const adoptTrip = (trip: Trip): Trip => {
	if (trip.users) {
		trip.users.forEach(user => {
			// @ts-ignore
			if (isStdAvatar(user.avatar)) {
				// eslint-disable-next-line no-param-reassign
				user.avatarPath = avatarPath;
			} else {
				// @ts-ignore
				// eslint-disable-next-line no-param-reassign
				user.avatarPath = user.avatar;
			}
		});
	}
	// if (trip.albums) {
	// 	const ownAlbums: Album[] = [];
	// 	trip.albums.forEach(album => {
	// 		// @ts-ignore
	// 		if (album.user_id === storage.getProfile().meta.id) {
	// 			ownAlbums.push(album);
	// 		}
	// 	})
	// 	// eslint-disable-next-line no-param-reassign
	// 	trip.albums = ownAlbums;
	// }
	return trip;
};
