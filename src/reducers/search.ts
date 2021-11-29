import { dispatcher, EventType, Token } from '@/dispatcher';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, searchURI, sightsURI } from '@/constants';
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
		this.#tokens = [dispatcher.register(EventType.SEARCH_REQUEST, this.sendSearchRequest)];
	};

	sendSearchRequest = (search: Search) => {
		const url = new URL(backendEndpoint + sightsURI + searchURI);
		url.searchParams.set('search', search.text);
		url.searchParams.set('skip', '0');
		url.searchParams.set('limit', '0');
		const countriesPromise = sendGetJSONRequest(url.toString())
			.then(response => {
				if (response.ok) {
					return Promise.resolve(response);
				}
				return Promise.reject(new Error('wrong answer on list of countries'));
			})
			.then(response => response.json())
			.then(response => {
				console.log('response search list', response, response.name);
				storage.storeSearchSightsResult(search.type, response);
			});
		dispatcher.notify(gotSearchResults(search.type));
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
