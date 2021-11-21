import { dispatcher, EventType, Token } from '@/dispatcher';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, searchURI } from '@/constants';
import { Search } from '@/dispatcher/metadata_types';
import { Sight } from '@/models';
import { storage } from '@/storage';
import { gotSearchResults } from '@/actions/search';

export default class SearchReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.SEARCH_REQUEST, this.sendSearchRequest),
		];
	};

	sendSearchRequest = (search: Search) => {
		const searchURL = new URL(searchURI, backendEndpoint);
		searchURL.searchParams.set('input', search.text);
		// this.#sendRequest(searchURL.toString())
		// 	.then((sights: Sight[]) => {
		// 		storage.storeSearchSightsResult(search.type, sights);
		 		storage.storeSearchSightsResult(search.type, [
					{
						id: '1',
						name: "мама",
						description: "test",
						rating: '7',
						photos: [],
						country: '1',
						tags: []
					},
					{
						id: '2',
						name: "мапа",
						description: "test",
						rating: '7',
						photos: [],
						country: '1',
						tags: []
					}
				]);
				dispatcher.notify(gotSearchResults(search.type));
			// });
	}

	#sendRequest = (url: string): Promise<Sight[]> =>
		sendGetJSONRequest(url)
			.then(response => {
				if (response.status === 404) {
					return Promise.resolve(response);
				}
				if (response.status !== 200) {
					return Promise.reject(new Error('непредвиденная ошибка при поиске'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
}
