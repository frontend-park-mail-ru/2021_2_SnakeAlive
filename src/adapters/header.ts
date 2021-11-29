import { Profile } from '@/models/profile';
import { backendFileEndpoint } from '@/constants';

export interface GotProfileResponse {
	id: number;
	name: string;
	surname: string;
	avatar: string;
	description: string;
	email: string;
}
