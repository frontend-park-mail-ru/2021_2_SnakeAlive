import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, countrySights } from '@/constants';
import {
	destroyCurrentPage,
	newGetCountryCardsError,
	newGetCountryCardsResult,
	newSetMainHeaderRequest,
} from '@/actions';
import { adaptGetCards } from '@/adapters';
import { storage } from '@/storage';
import { dispatcher, EventType, NamedID, IdData, Token, IEvent, DataType } from '@/dispatcher';
import { Country, CountryCard, CountryCardResponse } from '@/models';

export default class CountryReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		dispatcher.notify(newSetMainHeaderRequest());

		this.#tokens = [
			// dispatcher.register(initCountryRequest, this.initCountryPage),
			dispatcher.register(EventType.GET_COUNTRY_CARDS_REQUEST, this.getCountryCards),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	initCountryPage = (metadata: DataType): void => {
		const country = <NamedID>metadata;
		storage.storeCountry(<Country>{
			name: country.name,
			ID: <string>country.ID,
		});

		// dispatcher.notify(newGetCountryCardsResult(country.name, <string>country.ID));
	};

	getCountryCards = (metadata: DataType): void => {
		const data = <IdData>metadata;
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
