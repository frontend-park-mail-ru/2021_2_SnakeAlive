import { dispatcher, EventType, Token, UUID } from '@/dispatcher';
import { Sight, SightDay, Trip } from '@/models';
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
import { newGetTripResult, rerenderTripCards, createTripEdit } from '@/actions/trip';
import { initErrorPageRequest } from '@/actions/page';
import { newSetMainHeaderRequest } from '@/actions/header';
import { NumID, SightToTrip, TripInfo } from '@/dispatcher/metadata_types';
import { adoptForSend } from '@/adapters';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { TripFormInfo } from '@/models/trip';
import { TripInfoView } from '@/view/trip';

export default class TripReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_REQUEST, this.initTripEditPage),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),

			dispatcher.register(EventType.CREATE_TRIP_FORM_REQUEST, this.createTrip),
			dispatcher.register(EventType.UPDATE_CURRENT_TRIP_INFO, this.updateCurrentTripInfo),
			
			dispatcher.register(EventType.ADD_CURRENT_TRIP_PLACE, this.addCurrentTripPlace),
			dispatcher.register(EventType.DELETE_CURRENT_TRIP_PLACE, this.deleteCurrentTripPlace),

			//dispatcher.register(EventType.SEND_TRIP, this.sendTrip),
			dispatcher.register(EventType.DELETE_TRIP, this.deleteTrip),
		];

		dispatcher.notify(newSetMainHeaderRequest());
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	// sendTrip = () => {
	// 	const trip = storage.getCurrentTrip();
	// 	const tripSend = adoptForSend(trip);
	// 	// отправка обновления
	// 	this.#updateTrip(tripSend, trip.id);
	// };

	initTripEditPage = (metadata: NumID) => {
		const { ID } = metadata;
		console.log('ID', ID);
		this.#getTrip(ID.toString())
			.then((trip: Trip) => {
				console.log('GET trip =  ', trip);
				storage.storeCurrentTrip(trip);
				dispatcher.notify(newGetTripResult(ID));
				// ?
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	addCurrentTripPlace = (metadata: SightDay) => {
		const trip = storage.getCurrentTrip();
		trip.sights.push(metadata.sight)
		storage.storeCurrentTrip(trip)
		const tripSend = adoptForSend(trip);
		console.log("tripSend = ", tripSend)
		this.#updateTrip(tripSend, trip.id).then(response => {
			console.log("stored trip = ", storage.getCurrentTrip())
			dispatcher.notify(rerenderTripCards(true));
		});
	};

	deleteCurrentTripPlace = (metadata: SightToTrip) => {
		const trip = storage.getCurrentTrip();

		const copiedDays: Sight[][] = [[]];
		let found = false;

		// trip.sights[metadata.day].forEach(sight => {
		// 	// eslint-disable-next-line eqeqeq
		// 	if (sight.id == String(metadata.sightId) && !found) {
		// 		found = true;
		// 	} else {
		// 		copiedDays[0].push(sight);
		// 	}
		// });

		// trip.days = copiedDays;

		console.log(trip);

		const tripSend = adoptForSend(trip);

		console.log(tripSend);

		// отправка обновления
		this.#updateTrip(tripSend, trip.id).then(response => {
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
		this.#updateTrip(tripSend, trip.id).then(response => {
			storage.storeCurrentTrip(response);
			// dispatcher.notify( ??
		});
	};

	createTrip  = (metadata: TripInfo) => {
		const trip = storage.getCurrentTrip();
		console.log("trip=  ", trip)
		const tripSend = adoptForSend(trip);
		// const tripSend: TripFormInfo = {
		// 	title: "",
		// 	description: "",
		// 	sights: [{ id: 1, day: 0 }],
		// };
		tripSend.title = metadata.title;
		tripSend.description = metadata.description;
		console.log("meta", metadata)
		console.log("tripSend", tripSend)
		// отправка обновления
		this.#addTrip(tripSend, trip.id).then(response => {
			console.log("storeCurrentTrip = ", storage.getCurrentTrip())
			storage.addLastTripId(Number(response.id));
			router.go(
				createFrontendQueryParams(pathsURLfrontend.trip, [
					{
						key: paramsURLfrontend.id,
						value: response.id,
					},
				])
			);
			dispatcher.notify(createTripEdit(response.id, true))
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


	#addTrip = (data: TripFormInfo, tripId: string): Promise<Trip> => {
		console.log("post data", data)
		return sendPostJSONRequest(backendEndpoint + postTripURI, data)
		.then(response => {
			if (response.status === 400) {
				return Promise.reject(new Error('Bad request'));
			}
			if (response.status === 401) {
				return Promise.reject(new Error('Нужно войти в систему'));
			}
			return Promise.resolve(response);
		})
		.then(response => response.json())
		.then(response => {
			console.log("returning trip id = ", response)
			return response;
		});			
	};

	#updateTrip = (data: TripFormInfo, tripId: string): Promise<Trip> => {
		return sendPatchJSONRequest(backendEndpoint + tripURI + tripId, data)
		.then(response => {
			if (response.status === 400) {
				return Promise.reject(new Error('Bad request'));
			}
			if (response.status === 401) {
				return Promise.reject(new Error('Нужно войти в систему'));
			}
			return Promise.resolve(response);
		})
		.then(response => {return response.json();});

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
