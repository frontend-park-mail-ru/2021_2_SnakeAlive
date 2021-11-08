import {
	GetProfileResponse,
	Profile,
	ProfileMetadata,
	UpdateProfileMetadataRequest,
	UpdateProfileMetadataResponse,
} from '@/models/profile';
import { UpdateProfile } from '@/dispatcher';

export function adaptGetProfileResponse(response: GetProfileResponse): Profile {
	return <Profile>{
		meta: <ProfileMetadata>{
			name: response.name,
			surname: response.surname,
			description: response.description,
			email: response.email,
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
		email: request.email,
		description: request.description,
	};
}

export function adaptUpdateProfileMetadataResponse(
	response: UpdateProfileMetadataResponse
): ProfileMetadata {
	return <ProfileMetadata>{
		name: response.name,
		surname: response.surname,
		description: '',
	};
}
