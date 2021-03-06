import { dispatcher, EventType, Token } from '@/dispatcher';
import { sendGetJSONRequest, sendPatchJSONRequest } from '@/http';
import { backendEndpoint, searchURI, sightsURI } from '@/constants';
import { Search } from '@/dispatcher/metadata_types';
import { Sight } from '@/models';
import { storage } from '@/storage';
import { gotSearchResults, searchRequest } from '@/actions/search';
import { isSearchRequestEmpty, SearchRequest } from '@/models/search';

export default class SearchReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [dispatcher.register(EventType.SEARCH_REQUEST, this.sendSearchRequest)];
	};

	sendSearchRequest = (search: Search) => {
		if (!search.text) {
			return;
		}

		const url = new URL(backendEndpoint + sightsURI + searchURI);
		sendPatchJSONRequest(url.toString(), <SearchRequest>{
			search: search.text,
		})
			.then(response => {
				if (response.ok) {
					return Promise.resolve(response);
				}
				return Promise.reject(new Error('not ok search answer'));
			})
			.then(response => response.json())
			.then(response => {
				storage.storeSearchSightsResult(search.type, response);
				dispatcher.notify(gotSearchResults(search.type));
			});
	};

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
