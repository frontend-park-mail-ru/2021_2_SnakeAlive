import {
	GetProfileResponse,
	Profile, ProfileAlbum,
	ProfileMetadata, ProfileTrip,
	UpdateProfileMetadataRequest,
	UpdateProfileMetadataResponse,
} from '@/models/profile';
import { UpdateProfile } from '@/dispatcher';
import { backendFileEndpoint } from '@/constants';
import { storage } from '@/storage';

import avatarPath from '../../image/test.jpeg';
import { destroyCurrentPage } from '@/actions/page';

export function adaptGetProfileResponse(response: GetProfileResponse): Profile {
	return <Profile>{
		meta: <ProfileMetadata>{
			name: response.name,
			surname: response.surname,
			description: response.description,
			email: response.email,
		},
		profileImage: avatarPath,
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
	trips.forEach((trip) => {
		// eslint-disable-next-line no-param-reassign
		trip.htmlId = `go_trip_${trip.id}`
	});
	return trips;
}

export const adoptProfileAlbums = (albums: ProfileAlbum[]): ProfileAlbum[] => {
	albums.forEach((album) => {
		// eslint-disable-next-line no-param-reassign
		album.htmlId = `go_album_${album.id}`
	});
	return albums;
}