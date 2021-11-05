import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, countrySights } from '@/constants';
import {
	newGetCountryCardsError,
	newGetCountryCardsRequest,
	newGetCountryCardsResult,
	newInitCountryResponse,
	newSetMainHeaderRequest,
} from '@/actions';
import { adaptGetCards } from '@/adapters';
import { storage } from '@/storage';
import { DataType, dispatcher, EventType, UUID, NamedUUID, Token } from '@/dispatcher';
import { Country, CountryCardResponse } from '@/models';

export default class CountryReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.INIT_COUNTRY_REQUEST, this.initCountryPage),
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
		const country = <NamedUUID>metadata;
		storage.storeCountry(<Country>{
			name: country.name,
			ID: <string>country.ID,
		});
		dispatcher.notify(newSetMainHeaderRequest());
		dispatcher.notify(newInitCountryResponse());
		dispatcher.notify(newGetCountryCardsRequest(country.name, <string>country.ID));
	};

	getCountryCards = (metadata: DataType): void => {
		const data = <UUID>metadata;
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
