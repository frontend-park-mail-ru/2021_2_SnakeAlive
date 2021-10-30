import { storage } from '../storage/index';
import { dispatcher, EventType, Token } from '../dispatcher/index';
import {
	destroyCountryPage,
	getCountryCardRequest,
	initCountryRequest,
	newSetMainHeaderBasicResponse,
	newSetMainHeaderLoggedResponse,
	removeHeaderRequest,
	setMainHeaderRequest,
} from '../actions/index';
import { sendGetJSONRequest, HttpError } from '../http/index';
import { backendEndpoint, profile } from '../constants/index';
import { UserMetadata } from '../models/index';

export default class HeaderReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(setMainHeaderRequest, this.setHeader),
			dispatcher.register(removeHeaderRequest, this.destroy),
		];
	};

	destroy = (metadata: EventType): void => {
		// const that: HeaderReducer = this;
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	setHeader = (metadata: EventType): void => {
		sendGetJSONRequest(backendEndpoint + profile)
			.then(response => {
				if (response.status === 401) {
					return Promise.reject(
						new HttpError('пользователь не авторизован', response.status.toString())
					);
				}

				return response.json();
			})
			.then((data: UserMetadata) => {
				storage.setUserMetadata(data);
				dispatcher.notify(newSetMainHeaderLoggedResponse());
			})
			.catch(() => dispatcher.notify(newSetMainHeaderBasicResponse()));
	};
}
