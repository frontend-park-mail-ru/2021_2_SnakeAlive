import { Sight } from './sight';
import { Album } from '@/models/album';
import { UserMetadata } from '@/models/user';

export interface TripSight {
	day: number;
	sight: Sight;
}

export interface TripSightId {
	day: number;
	id: number;
}

export interface Trip {
	id: string;
	title: string;
	description: string;
	sights: Array<Sight>;
	albums: Array<Album>;
	users: Array<UserMetadata>;
	days: Array<TripSight>;
}

export interface TripSights {
	id: number;
	day: number;
}

export interface TripFormInfo {
	title: string;
	description: string;
	sights: Array<TripSights>;
}
