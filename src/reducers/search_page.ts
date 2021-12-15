import { sendGetJSONRequest, sendPatchJSONRequest } from '@/http';
import { backendEndpoint, listOfCountries, profile, searchURI, sightsURI } from '@/constants';
import { newGetCountryCardsError, newGetCountryCardsResult } from '@/actions/country';
import { newSetMainHeaderRequest } from '@/actions/header';
import { storage } from '@/storage';
import { dispatcher, EventType, NamedUUID, Token } from '@/dispatcher';
import { CountryCardResponse, CountryResponse } from '@/models';
import { minAdaptCountryCards } from '@/adapters/country_cards_min';
import { allTagsURI, tagsURI } from '@/constants/uris';
import { newGetTagCardsResult, newTagResponse } from '@/actions/tag';
import {
	gotSearchResults,
	initEmptySearchPageRequest,
	initEmptySearchPageResponse,
	newGetSearchCardsError,
	sendPageSearch,
} from '@/actions/search';
import { adoptGotSearchCountries } from '@/adapters/search';
import { TagResponse } from '@/models/tags';
import { GET_COUNTRY_NAME } from '@/components/trip/trip_form';
import { isSearchRequestEmpty, searchPlaceType, SearchRequest } from '@/models/search';
import { adoptGotTags } from '@/adapters/tags';

export const getTags = (): Promise<TagResponse[]> =>
	sendGetJSONRequest(backendEndpoint + allTagsURI)
		.then(response => {
			if (response.status !== 200) {
				return Promise.reject(new Error('проблемы при получении списка тегов'));
			}
			return Promise.resolve(response);
		})
		.then(response => {
			console.log(response.clone());
			return response.json();
		});

export default class SearchPageReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
			dispatcher.register(EventType.INIT_EMPTY_SEARCH_PAGE_REQUEST, this.initSearchPage),
			dispatcher.register(EventType.SEND_PAGE_SEARCH, this.sendSearchRequest),
		];
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	initSearchPage = (): void => {
		dispatcher.notify(newSetMainHeaderRequest());
		// запрос за странами
		this.#getSearchCountries().then(countries => {
			storage.storeGotSearchCountries(adoptGotSearchCountries(countries));
			// запрос за категориями
			getTags().then(tags => {
				storage.storeGotSearchTags(adoptGotTags(tags));
				dispatcher.notify(initEmptySearchPageResponse());
			});
		});
	};

	sendSearchRequest = (): void => {
		console.log("send: ", storage.getSearchRequest());

		if (isSearchRequestEmpty(storage.getSearchRequest())) {
			return;
			// вывод валидации?
		}

		this.#sendSearch()
			.then((cards: CountryCardResponse[]) => {
				storage.storeSightsCardsMin(minAdaptCountryCards(cards, storage.getSearchTags()));
				dispatcher.notify(gotSearchResults(searchPlaceType.page));
			})
			.catch((error: Error) => {
				if (error.message === '400') {
					storage.storeSightsCardsMin([]);
					dispatcher.notify(gotSearchResults(searchPlaceType.page));
				}
				dispatcher.notify(newGetSearchCardsError(error));
			});
	};

	#sendSearch = (): Promise<CountryCardResponse[]> =>
		sendPatchJSONRequest(backendEndpoint + sightsURI + searchURI, storage.getSearchRequest())
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('На сайте нет такой страницы'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('Нужно войти в систему'));
				}
				if (response.status === 400) {
					return Promise.reject(new Error('400'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());

	#getCards = (tagID: string): Promise<CountryCardResponse[]> => {
		const uri = new URL(backendEndpoint + tagsURI);

		uri.searchParams.append('tag', tagID);
		return sendGetJSONRequest(uri.toString())
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('На сайте нет такой страницы'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('Нужно войти в систему'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
	};

	#getSearchCountries = (): Promise<CountryResponse[]> =>
		sendGetJSONRequest(backendEndpoint + listOfCountries)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(new Error('проблемы при получении списка стран'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
}
