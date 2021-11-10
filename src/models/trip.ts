import { Sight } from './sight';

export interface Trip {
	id: string;
	title: string;
	description: string;
	days: Array<Array<Sight>>;
}

export interface TripFormInfo {
	title: string;
	description: string;
	days: Array<Array<Record<string, number>>>;
	// id: string;
}
