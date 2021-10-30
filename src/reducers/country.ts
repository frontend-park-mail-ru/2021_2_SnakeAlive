import { sendGetJSONRequest } from '../http';
import { backendEndpoint, countrySights } from '../constants';
import {
	destroyCountryPage,
	getCountryCardRequest,
	initCountryRequest,
	newGetCountryCardsError,
	newGetCountryCardsResult,
	newInitCountryResponse,
} from '../actions';
import { adaptGetCards } from '../adapters/index';
import { storage } from '../storage/index';
import { dispatcher, EventType, NamedID, ID, Token } from '../dispatcher/index';
import { Country, CountryCard, CountryCardResponse } from '../models/index';

export default class CountryReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(initCountryRequest, this.initCountryPage),
			dispatcher.register(getCountryCardRequest, this.getCountryCards),
			dispatcher.register(destroyCountryPage, this.destroy),
		];
	};

	destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	initCountryPage = (metadata: EventType): void => {
		const country = <NamedID>metadata;
		storage.storeCountry(<Country>{
			name: country.name,
			ID: <string>country.ID,
		});

		dispatcher.notify(newInitCountryResponse(country.name, <string>country.ID));
	};

	getCountryCards = (metadata: EventType): void => {
		const data = <ID>metadata;
		this.#getCards(<string>data.ID)
			.then((cards: CountryCardResponse[]) => {
				storage.storeCountryCards(adaptGetCards(cards));
				dispatcher.notify(newGetCountryCardsResult());
			})
			.catch((error: Error) => {
				dispatcher.notify(newGetCountryCardsError(error));
			});
	};

	#getCards = (countryID: string): Promise<CountryCardResponse[]> =>
		sendGetJSONRequest(backendEndpoint + countrySights + countryID)
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
}
