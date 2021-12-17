import { storage } from '@/storage';
import { dispatcher, EventType, Token } from '@/dispatcher';
import {
	newSetEmptyHeaderResponse,
	newSetMainHeaderBasicResponse,
	newSetMainHeaderLoggedResponse,
} from '@/actions/header';
import { HttpError, sendGetJSONRequest } from '@/http/index';
import { backendEndpoint, profile } from '@/constants/index';
import { GotProfileResponse } from '@/adapters/header';
import { IsTrue } from '@/dispatcher/metadata_types';
import { adaptGetProfileResponse } from '@/adapters/profile';

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

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	checkIfMain = () => {
		// console.log(this.#state, "isMain?");
		if (this.#state !== state.main) {
			this.setHeader();
			this.#state = state.main;
		}
	};

	checkIfEmpty = (metadata: IsTrue) => {
		// console.log(this.#state, "isEmpty?");
		if (this.#state !== state.empty) {
			dispatcher.notify(newSetEmptyHeaderResponse(metadata.isTrue));
			this.#state = state.empty;
		}
	};

	setHeader = (): void => {
		// console.log(this.#state,  "-> main");
		this.#state = state.main;
		sendGetJSONRequest(backendEndpoint + profile)
			.then(response => {
				if (response.status === 401) {
					return Promise.reject(
						new HttpError('пользователь не авторизован', response.status.toString())
					);
				}
				return response.json();
			})
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			.then((data: GotProfileResponse) => {
				storage.storeProfile(adaptGetProfileResponse(data));
				dispatcher.notify(newSetMainHeaderLoggedResponse());
			})
			.catch(err => {
				if (err.status !== undefined) {
					dispatcher.notify(newSetMainHeaderBasicResponse());
				}
			});
	};
}
