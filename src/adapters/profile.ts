import {
	AlienProfileTrip,
	GetProfileResponse,
	Profile,
	ProfileAlbum,
	ProfileMetadata,
	ProfileTrip,
	UpdateProfileMetadataRequest,
	UpdateProfileMetadataResponse,
} from '@/models/profile';
import { UpdateProfile } from '@/dispatcher';
import { storage } from '@/storage';

import avatarPath from '../../image/test.webp';

export function adaptGetProfileResponse(response: GetProfileResponse): Profile {
	if (
		response.avatar === 'default.webp' ||
		response.avatar.slice(-9) === 'test.webp' ||
		response.avatar.slice(-12) === 'default.webp' ||
		response.avatar.slice(-9) === 'test.jpeg' ||
		response.avatar.slice(-12) === 'default.jpeg'
	) {
		response.avatar = avatarPath;
	}

	return <Profile>{
		meta: <ProfileMetadata>{
			name: response.name,
			surname: response.surname,
			description: response.description,
			email: response.email,
			id: response.id,
		},
		profileImage: response.avatar,
	};
}

export function adaptUpdateProfileMetadataRequest(
	request: UpdateProfile
): UpdateProfileMetadataRequest {
	return <UpdateProfileMetadataRequest>{
		name: request.name,
		surname: request.surname,
		password: request.password,
		email: storage.getProfile().meta.email,
		description: request.description,
	};
}

export function adaptUpdateProfileMetadataResponse(
	response: UpdateProfileMetadataResponse
): ProfileMetadata {
	return <ProfileMetadata>{
		email: response.email,
		avatar: '',
		name: response.name,
		surname: response.surname,
		description: '',
		id: Number(response.id),
	};
}

export const adoptProfileTrips = (trips: ProfileTrip[]): ProfileTrip[] => {
	if (trips) {
		trips.forEach(trip => {
			// eslint-disable-next-line no-param-reassign
			trip.htmlId = `go_trip_${trip.id}`;
		});
		return trips;
	}
	return [];
};

export const adoptProfileAlbums = (albums: ProfileAlbum[]): ProfileAlbum[] => {
	if (albums) {
		albums.forEach(album => {
			// eslint-disable-next-line no-param-reassign
			album.htmlId = `go_album_${album.id}`;
		});
		return albums;
	}
	return [];
};

export const adoptAlienProfileTrips = (
	trips: AlienProfileTrip[],
	alienId: string
): ProfileTrip[] => {
	if (trips) {
		const commonTrips: ProfileTrip[] = trips.filter(trip => {
			let isCommon = false;
			trip.users.forEach(user => {
				if (user.id.toString() === alienId) {
					isCommon = true;
				}
			});
			return isCommon;
		});
		commonTrips.forEach(trip => {
			// eslint-disable-next-line no-param-reassign
			trip.htmlId = `go_trip_${trip.id}`;
		});
		return commonTrips;
	}
	return [];
};
