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
	min_rating: number;
	min_amount_reviews: number;
}

export const isSearchRequestEmpty = (req: SearchRequest): boolean =>
	!req.search && !req.tags && !req.countries && !req.min_amount_reviews && !req.min_rating;
