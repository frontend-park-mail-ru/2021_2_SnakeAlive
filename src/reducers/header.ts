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

const enum state {
	main = 'main',
	empty = 'empty',
	no = 'no',
}

export default class HeaderReducer {
	#tokens: Token[];

	#state: state;

	constructor() {
		this.#tokens = [];
		this.#state = state.no;
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.SET_MAIN_HEADER_STRONG_REQUEST, this.setHeader),
			dispatcher.register(EventType.SET_MAIN_HEADER_REQUEST, this.checkIfMain),
			dispatcher.register(EventType.REMOVE_HEADER_REQUEST, this.destroy),
			dispatcher.register(EventType.SET_MAIN_HEADER_EMPTY_REQUEST, this.checkIfEmpty),
		];
	};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	checkIfMain = () => {
		if (this.#state !== state.main) {
			this.setHeader({});
			console.log(this.#state, ' -> ', state.main);
			this.#state = state.main;
		}
	};

	checkIfEmpty = () => {
		if (this.#state !== state.empty) {
			console.log('here?77777');
			dispatcher.notify(newSetEmptyHeaderResponse());
			console.log(this.#state, ' -> ', state.empty);
			this.#state = state.empty;
		}
	};

	setHeader = (metadata: DataType): void => {
		this.#state = state.main;
		console.log('setHeader');
		sendGetJSONRequest(backendEndpoint + profile)
			.then(response => {
				if (response.status === 401) {
					return Promise.reject(
						new HttpError('пользователь не авторизован', response.status.toString())
					);
				}
				console.log(response.status);
				return response.json();
			})
			.then((data: UserMetadata) => {
				storage.setUserMetadata(data);
				dispatcher.notify(newSetMainHeaderLoggedResponse());
			})
			.catch(err => {
				console.log('err ', err.status);
				if (err.status !== undefined) {
					dispatcher.notify(newSetMainHeaderBasicResponse());
				}
			});
	};
}
