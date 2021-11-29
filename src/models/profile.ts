export interface GetProfileResponse {
	name: string;
	surname: string;
	avatar: string;
	description: string;
	email: string;
}

export interface UpdateProfileMetadataRequest {
	name: string;
	surname: string;
	password: string;
	email: string;
	description: string;
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
	title: string;
	description: string;
}

export interface ProfileAlbum {
	meta: ProfileMetadata;
	profileImage: string;
}
