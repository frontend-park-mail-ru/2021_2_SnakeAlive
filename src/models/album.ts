import { UserMetadata } from '@/models/user';

export interface Album {
	id: number;
	tripId: number;
	user: UserMetadata;
	title: string;
	description: string;
	photos: string[];
}
