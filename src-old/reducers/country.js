import { sendGetJSONRequest } from '../http/index.js';
import { backendEndpoint, countrySights } from '../constants/index.js';
import {
	getCountryCardRequest,
	initCountryRequest,
	newGetCountryCardsError,
	newGetCountryCardsResult,
	newInitCountryResponse,
} from '../actions/index.js';
import { adaptGetCards } from '../adapters/index.js';

export default class CountryReducer {
	#storage;

	#dispatcher;

	#tokens = [];

	constructor(storage, dispatcher) {
		this.#storage = storage;
		this.#dispatcher = dispatcher;
	}

	init() {
		this.#tokens = [
			this.#dispatcher.register(initCountryRequest, this.initCountryPage),
			this.#dispatcher.register(getCountryCardRequest, this.getCountryCards),
		];
	}

	destroy() {
		this.#tokens.forEach(element => {
			this.#dispatcher.unregister(element);
		});
	}

	initCountryPage(metadata = {}) {
		this.#storage.storeCountry(metadata);
		this.#dispatcher.notify(newInitCountryResponse(metadata.name, metadata.ID));
	}

	getCountryCards(metadata = {}) {
		this.#getCards(metadata.ID)
			.then(cards => {
				this.#storage.storeCountryCards(adaptGetCards(cards));
				this.#dispatcher.notify(newGetCountryCardsResult());
			})
			.catch(error => {
				this.#dispatcher.notify(newGetCountryCardsError(error));
			});
	}

	#getCards(countryID) {
		return sendGetJSONRequest(backendEndpoint + countrySights + countryID).then(response => {
			if (response.status === 404) {
				return Promise.reject(new Error('На сайте нет такой страницы'));
			}
			if (response.status === 401) {
				return Promise.reject(new Error('Нужно войти в систему'));
			}
			return Promise.resolve(response);
		});
	}
}
