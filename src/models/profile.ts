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
}

export interface ProfileMetadata {
	name: string;
	surname: string;
	description: string;
	email: string;
}

export interface Profile {
	meta: ProfileMetadata;
	profileImage: string;
}
