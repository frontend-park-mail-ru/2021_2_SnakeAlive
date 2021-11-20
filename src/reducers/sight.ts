import { dispatcher, EventType, NumID, Token, UUID } from '@/dispatcher';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, sightURI } from '@/constants';
import { storage } from '@/storage';
import { initErrorPageRequest } from '@/actions/page';
import { Sight } from '@/models';
import { newGetSightResult } from '@/actions/sight';
import { newSetMainHeaderRequest } from '@/actions/header';

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
		dispatcher.notify(newSetMainHeaderRequest());
		const { ID } = metadata;
		this.#getSight(ID)
			.then((sight: Sight) => {
				storage.storeSight(sight);
				dispatcher.notify(newGetSightResult());
				// dispatcher.notify(createReviewForm());
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

	#getReviews = (id: string): Promise<Sight> =>
		sendGetJSONRequest(backendEndpoint + sightURI + id)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(new Error('не удалось загрузить отзывы'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
}
