import { dispatcher, EventType, Token } from '@/dispatcher';
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

	init = (id: string) => {
		// this.#tokens = [
		// 	dispatcher.register(GET_TRIP_INFO_REQUEST, this.initTripPage)
		// ];
		console.log('init trip');
		// карточки достопримечательностей - также, как у страны
		this.initTripPage(id);
	};

	initTripPage = (id: string) => {
		console.log(id);
		this.#getTrip(id)
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

	destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};
}
