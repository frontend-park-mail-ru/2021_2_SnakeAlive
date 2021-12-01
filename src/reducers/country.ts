import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, countrySights, sightsURI } from '@/constants';
import {
	newGetCountryCardsError,
	newGetCountryCardsRequest,
	newGetCountryCardsResult,
	newInitCountryResponse,
} from '@/actions/country';
import { initErrorPageRequest } from '@/actions/page';
import { newSetMainHeaderRequest } from '@/actions/header';
import { storage } from '@/storage';
import { DataType, dispatcher, EventType, UUID, NamedUUID, Token } from '@/dispatcher';
import { CountryCardResponse, CountryResponse } from '@/models';
import { minAdaptCountryCards } from '@/adapters/country_cards_2';
import { GET_COUNTRY_NAME } from '@/components/trip/trip_form';
import { adoptGotCountry } from '@/adapters/country';

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
		console.log('country - ', country);
		dispatcher.notify(newSetMainHeaderRequest());
		// получение инфы по стране
		this.#getCountry(country.ID)
			.then((info: CountryResponse) => {
				console.log(info);
				storage.storeCountry(adoptGotCountry(info));
				dispatcher.notify(newInitCountryResponse());
				dispatcher.notify(newGetCountryCardsRequest(country.name, <string>country.ID));
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	getCountryCards = (metadata: DataType): void => {
		const data = <UUID>metadata;

		// собственно получение мест
		this.#getCards(<string>data.ID)
			.then((cards: CountryCardResponse[]) => {
				console.log('country reducer : ', cards);
				// storage.storeCountryCards(adaptGetCards(cards));
				storage.storeSightsCardsMin(minAdaptCountryCards(cards));
				console.log(storage.getCountryCards());
				dispatcher.notify(newGetCountryCardsResult());
			})
			.catch((error: Error) => {
				dispatcher.notify(newGetCountryCardsError(error));
			});
	};

	#getCards = (countryID: string): Promise<CountryCardResponse[]> =>
		// sendGetJSONRequest(backendEndpoint + sightsURI + GET_COUNTRY_NAME(countryID))
		sendGetJSONRequest(backendEndpoint + sightsURI + GET_COUNTRY_NAME(countryID))
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

	#getCountry = (countryID: string): Promise<CountryResponse> =>
		sendGetJSONRequest(`${backendEndpoint + countrySights}id/${countryID}`)
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('Информации по этой стране пока нет'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('Нужно войти в систему'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
}
