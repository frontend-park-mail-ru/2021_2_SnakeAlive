export const enum searchPlaceType {
	page = 'page',
	header = 'header',
	trip = 'trip'
}

export interface SearchRequest {
	search: string,
	skip: number,
	limit: number,
	tags: number[],
	countries: string[]
}