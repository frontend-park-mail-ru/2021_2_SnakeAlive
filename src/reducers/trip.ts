import { dispatcher, EventType, IdData, Token } from '@/dispatcher';
import { Trip } from '@/models';
import { storage } from '@/storage';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, tripURI } from '@/constants';
import { initErrorPageRequest, newGetTripResult } from '@/actions';

export default class TripReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_REQUEST, this.initTripPage),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
		// карточки достопримечательностей - также, как у страны
	};

	destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	initTripPage = (metadata: IdData) => {
		const { ID } = metadata;
		this.#getTrip(ID)
			.then((trip: Trip) => {
				storage.storeTrip(trip);
				dispatcher.notify(newGetTripResult());
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	#getTrip = (id: string): Promise<Trip> =>
		sendGetJSONRequest(backendEndpoint + tripURI + id)
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
