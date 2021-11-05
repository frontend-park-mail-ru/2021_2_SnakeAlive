import { dispatcher, EventType, Token } from '@/dispatcher';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, sightURI } from '@/constants';
import { storage } from '@/storage';
import { initErrorPageRequest } from '@/actions/page';
import { Sight } from '@/models';
import { newGetSightResult, newSetMainHeaderRequest } from '@/actions';

export default class SightReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = (id: string) => {
		this.#tokens = [dispatcher.register(EventType.INIT_COUNTRY_PAGE_REQUEST, this.initSightPage)];

		// карточки отзывов - также, как у страны

		dispatcher.notify(newSetMainHeaderRequest());

		this.initSightPage(id);
	};

	initSightPage = (id: string) => {
		this.#getSight(id)
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
