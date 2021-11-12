import { Profile } from '@/models/profile';

export interface GotProfileResponse {
	name: string;
	surname: string;
	avatar: string;
	description: string;
	email: string;
}

export const adoptGotDataToProfile = (data: GotProfileResponse): Profile =>
<Profile>{
	meta: {
		name: data.name,
		surname: data.surname,
		email: data.email,
		description: data.description
	},
	profileImage: data.avatar
};