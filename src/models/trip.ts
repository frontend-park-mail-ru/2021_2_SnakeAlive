import { Sight } from './sight';
import { Album } from '@/models/album';

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
	albums: Array<Album>;
	days: Array<TripSight>;
}

export interface TripOLD {
	id: string;
	title: string;
	description: string;
	albums: Array<Album>;
	days: Array<Array<Sight>>;
}

export interface TripFormInfo {
	title: string;
	description: string;
	// days: Array<Array<Record<string, number>>>;
	sights: Array<TripSightId>;
	// id: string;
}
