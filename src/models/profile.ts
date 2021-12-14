import { tripUser } from '@/models/user';

export interface GetProfileResponse {
	name: string;
	surname: string;
	avatar: string;
	description: string;
	email: string;
	id: number;
}

export interface UpdateProfileMetadataRequest {
	name: string;
	surname: string;
	password?: string;
	email: string;
	description: string;
	avatar?: string;
}

export interface UpdateProfileMetadataResponse {
	name: string;
	surname: string;
	avatar: string;
	email: string;
	id: string;
}

export interface ProfileMetadata {
	id: number;
	name: string;
	surname: string;
	description: string;
	email: string;
	avatar: string;
}

export interface Profile {
	meta: ProfileMetadata;
	profileImage: string;
}

export interface ProfileTrip {
	htmlId: string;
	id: number;
	title: string;
	description: string;
}

export interface ProfileAlbum {
	htmlId: string;
	id: number;
	title: string;
	description: string;
	photos: string[];
}

export interface AlienProfileTrip {
	htmlId: string;
	id: number;
	title: string;
	description: string;
	users: tripUser[];
}
