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
	sights: Array<Sight>;
	//albums: Array<Album>;
	albums: Array<Album>;
	days: Array<TripSight>;
}


export interface TripFormInfo {
	title: string;
	description: string;
	sights: Array<TripSights>;
}

export interface TripSights {
	id: number,
	day: number
	// days: Array<Array<Record<string, number>>>;
	sights: Array<TripSightId>;
	// id: string;
}
