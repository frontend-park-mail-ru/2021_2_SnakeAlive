import { UserMetadata } from '@/models/user';

export interface Album {
	id: number;
	user: UserMetadata;
	title: string;
	description: string;
	photos: string[];
}
