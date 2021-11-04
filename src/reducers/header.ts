import { storage } from '../storage';
import { DataType, dispatcher, EventType, Token } from '../dispatcher';
import {
	newSetEmptyHeaderResponse,
	newSetMainHeaderBasicResponse,
	newSetMainHeaderLoggedResponse,
} from '@/actions/index';
import { HttpError, sendGetJSONRequest } from '@/http/index';
import { backendEndpoint, profile } from '@/constants/index';
import { UserMetadata } from '@/models';

export default class HeaderReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.SET_MAIN_HEADER_REQUEST, this.setHeader),
			dispatcher.register(EventType.REMOVE_HEADER_REQUEST, this.destroy),
		];
	};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	setHeader = (metadata: DataType): void => {
		console.log('setHeader');
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
