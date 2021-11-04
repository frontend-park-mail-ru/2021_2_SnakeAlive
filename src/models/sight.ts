interface Review {
	title: string;
	text: string;
}

export interface Sight {
	id: string;
	name: string;
	description: string;
	country: string;
	rating: string;
	tags: Array<string>;
}
