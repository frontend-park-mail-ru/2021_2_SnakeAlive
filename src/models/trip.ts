import { Sight } from './sight';
import { Album } from '@/models/album';

export interface Trip {
	id: string;
	title: string;
	description: string;
	albums: Array<Album>;
	days: Array<Array<Sight>>;
}

export interface TripFormInfo {
	title: string;
	description: string;
	days: Array<Array<Record<string, number>>>;
	// id: string;
}
