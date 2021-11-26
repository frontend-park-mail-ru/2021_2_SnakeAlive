import { Sight } from './sight';
import { Album } from '@/models/album';

export interface Trip {
	id: string;
	title: string;
	description: string;
	albums: Array<Album>;
	sights: Array<Sight>;
}

export interface TripFormInfo {
	title: string;
	description: string;
	sights: Array<TripSights>;
}

export interface TripSights {
	id: number,
	day: number
}
