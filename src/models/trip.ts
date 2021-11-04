import { Sight } from './sight';

export interface Trip {
	id: string;
	title: string;
	description: string;
	days: Array<Array<Sight>>;
}
