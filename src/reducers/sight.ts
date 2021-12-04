import { dispatcher, EventType, Token, UUID } from '@/dispatcher';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, sightURI } from '@/constants';
import { storage } from '@/storage';
import { initErrorPageRequest } from '@/actions/page';
import { Sight } from '@/models';
import { newGetSightResult } from '@/actions/sight';

export default class SightReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_SIGHT_REQUEST, this.initSightPage),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = () => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	initSightPage = (metadata: UUID) => {
		const { ID } = metadata;
		this.#getSight(ID)
			.then((sight: Sight) => {
				storage.storeSight(sight);
				dispatcher.notify(newGetSightResult());
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	#getSight = (id: string): Promise<Sight> =>
		sendGetJSONRequest(backendEndpoint + sightURI + id)
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
