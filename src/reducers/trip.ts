import { dispatcher, EventType, Token, UUID } from '@/dispatcher';
import { Sight, Trip } from '@/models';
import { storage } from '@/storage';
import {
	sendDeleteJSONRequest,
	sendGetJSONRequest,
	sendPatchJSONRequest,
	sendPostJSONRequest,
} from '@/http';
import {
	backendEndpoint,
	frontEndEndPoint,
	paramsURLfrontend,
	pathsURLfrontend,
	postTripURI,
	tripURI,
} from '@/constants';
import { newGetTripResult, rerenderTripCards } from '@/actions/trip';
import { initErrorPageRequest } from '@/actions/page';
import { newSetMainHeaderRequest } from '@/actions/header';
import { IDState, SightToTrip, TripInfo } from '@/dispatcher/metadata_types';
import { adoptForSend } from '@/adapters';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { TripFormInfo } from '@/models/trip';

export default class TripReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_REQUEST, this.initTripPage),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),

			dispatcher.register(EventType.UPDATE_CURRENT_TRIP_INFO, this.updateCurrentTripInfo),
			dispatcher.register(EventType.ADD_CURRENT_TRIP_PLACE, this.addCurrentTripPlace),
			dispatcher.register(EventType.DELETE_CURRENT_TRIP_PLACE, this.deleteCurrentTripPlace),

			dispatcher.register(EventType.SEND_TRIP, this.sendTrip),
			dispatcher.register(EventType.DELETE_TRIP, this.deleteTrip),
		];

		dispatcher.notify(newSetMainHeaderRequest());
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	sendTrip = () => {
		const trip = storage.getCurrentTrip();
		const tripSend = adoptForSend(trip);
		// отправка обновления
		this.#sendTrip(tripSend, trip.id);
	};

	initTripPage = (metadata: IDState) => {
		const { ID, state } = metadata;
		console.log('state', state);
		this.#getTrip(ID)
			.then((trip: Trip) => {
				console.log('trippp ', trip);
				storage.storeCurrentTrip(trip);
				dispatcher.notify(newGetTripResult(state));
				// ?
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	addCurrentTripPlace = (metadata: SightToTrip) => {
		const trip = storage.getCurrentTrip();
		const tripSend = adoptForSend(trip);
		// tripSend.days[metadata.day].push({ id: metadata.sightId });
		tripSend.sights.push({
			day: metadata.day,
			id: metadata.sightId
		});
		// отправка обновления
		this.#sendTrip(tripSend, trip.id).then(response => {
			storage.storeCurrentTrip(response);
			dispatcher.notify(rerenderTripCards(true));
		});
	};

	deleteCurrentTripPlace = (metadata: SightToTrip) => {
		const trip = storage.getCurrentTrip();

		// const copiedDays: Sight[][] = [[]];
		// let found = false;
		//
		// trip.days[metadata.day].forEach(sight => {
		// 	// eslint-disable-next-line eqeqeq
		// 	if (sight.id == String(metadata.sightId) && !found) {
		// 		found = true;
		// 	} else {
		// 		copiedDays[0].push(sight);
		// 	}
		// });
		//
		// trip.days = copiedDays;

		console.log(trip);

		const tripSend = adoptForSend(trip);

		console.log(tripSend);

		// отправка обновления
		this.#sendTrip(tripSend, trip.id).then(response => {
			storage.storeCurrentTrip(response);
			dispatcher.notify(rerenderTripCards(true));
		});
	};

	updateCurrentTripInfo = (metadata: TripInfo) => {
		const trip = storage.getCurrentTrip();
		const tripSend = adoptForSend(trip);

		tripSend.title = metadata.title;
		tripSend.description = metadata.description;

		// отправка обновления
		this.#sendTrip(tripSend, trip.id).then(response => {
			storage.storeCurrentTrip(response);
			// dispatcher.notify( ??
		});
	};

	deleteTrip = () => {
		const { id } = storage.getCurrentTrip();
		sendDeleteJSONRequest(backendEndpoint + tripURI + id)
			.then(response => {
				if (response.status === 200) {
					return Promise.resolve(response);
				}
				return Promise.reject(new Error(String(`response ended with, ${response.status}`)));
			})
			.then(() => {
				router.go(pathsURLfrontend.profile);
			});
	};

	#sendTrip = (data: TripFormInfo, tripId: string): Promise<Trip> => {
		// значит только что созданная форма
		if (window.location.href.split('?').length <= 1) {
			sendPostJSONRequest(backendEndpoint + postTripURI, data)
				.then(response => Promise.resolve(response))
				.then(response => response.json())
				.then(response => {
					router.go(
						createFrontendQueryParams(pathsURLfrontend.trip, [
							{
								key: paramsURLfrontend.id,
								value: response.id,
							},
							{
								key: paramsURLfrontend.edit,
								value: '1',
							},
						])
					);
				});
		}
		return sendPatchJSONRequest(backendEndpoint + tripURI + tripId, data)
			.then(response => Promise.resolve(response))
			.then(response => response.json());
		// .then((response) => {
		// 	storage.addLastTripId(response.id);
		// 	return response;
		// })
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
