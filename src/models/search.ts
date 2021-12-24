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

export const isSearchRequestEmpty = (req: SearchRequest): boolean => {
	if ((!req.min_amount_reviews) && (!req.min_rating)) {
		if (!req.search && !req.tags && !req.countries) {
			return true;
		} else {
			return false;
		}
	} else {
		if (req.search || req.tags || req.countries) {
			return false;
		} else {
			return true;
		}
	}
}
