export const enum searchPlaceType {
	page = 'page',
	header = 'header',
	trip = 'trip',
}

export interface SearchRequest {
	search: string;
	skip: number;
	limit: number;
	tags: number[];
	countries: string[];
}

export  const isSearchRequestEmpty = (req: SearchRequest): boolean =>
	(! req.search) && (! req.tags) && (! req.countries);