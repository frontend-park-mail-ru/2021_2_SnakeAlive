import { UserMetadata } from '@/models/user';

export interface Album {
	id: number;
	tripId: number;
	user: UserMetadata;
	title: string;
	description: string;
	photos: string[];
}

export interface GotAlbumInterface {
	id: number,
	// eslint-disable-next-line camelcase
	trip_id: number,
	// eslint-disable-next-line camelcase
	user_id: number,
	title: string,
	description: string,
	photos: string[]
}