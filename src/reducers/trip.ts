import { dispatcher, EventType, Token } from '@/dispatcher';
import { SightDay, Trip, UserEmail } from '@/models';
import { storage } from '@/storage';
import {
	sendDeleteJSONRequest,
	sendGetJSONRequest,
	sendPatchJSONRequest,
	sendPostJSONRequest,
} from '@/http';
import {
	backendEndpoint,
	paramsURLfrontend,
	pathsURLfrontend,
	postTripURI,
	tripURI,
	tripShare,
	tripAddUser,
} from '@/constants';
import {
	newGetTripResult,
	rerenderTripCards,
	createTripEdit,
	newShareTripLink,
	getAddUserToTripResponse,
} from '@/actions/trip';
import { newSetMainHeaderRequest } from '@/actions/header';
import { NumID, CardOrderAndDay, TripInfo, Email } from '@/dispatcher/metadata_types';
import { adoptForSend, adoptForCreate } from '@/adapters';
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
			dispatcher.register(EventType.GET_TRIP_REQUEST, this.initTripEditPage),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),

			dispatcher.register(EventType.CREATE_TRIP_FORM_REQUEST, this.createTrip),
			dispatcher.register(EventType.UPDATE_CURRENT_TRIP_INFO, this.updateCurrentTripInfo),

			dispatcher.register(EventType.ADD_CURRENT_TRIP_PLACE, this.addCurrentTripPlace),
			dispatcher.register(EventType.DEL_CURRENT_TRIP_PLACE, this.deleteCurrentTripPlace),

			dispatcher.register(EventType.DELETE_TRIP, this.deleteTrip),

			dispatcher.register(EventType.SHARE_TRIP_REQUEST, this.getShareTripLink),
			dispatcher.register(EventType.ADD_USER_TO_TRIP_REQUEST, this.addUserToTrip),
		];

		dispatcher.notify(newSetMainHeaderRequest());
	};

	addUserToTrip = (metadata: Email): void => {
		const tripID = storage.getCurrentTrip().id;
		const userToAdd: UserEmail = { email: metadata.email };
		// console.log('link :  ', backendEndpoint + tripAddUser + tripID);
		sendPostJSONRequest(backendEndpoint + tripAddUser + tripID, userToAdd)
			.then(response => {
				if (response.status === 404) {
					dispatcher.notify(getAddUserToTripResponse(false));
					return Promise.reject(new Error('Такой поездки не существует'));
				}
				if (response.status === 401) {
					dispatcher.notify(getAddUserToTripResponse(false));
					return Promise.reject(new Error('Нужно войти в систему'));
				}
				if (response.status === 400) {
					dispatcher.notify(getAddUserToTripResponse(false));
					return Promise.reject(new Error('Ошибка запроса'));
				}
				return Promise.resolve(response);
			})
			.then(() => {
				dispatcher.notify(getAddUserToTripResponse(true));
			});
	};

	getShareTripLink = (): void => {
		const tripID = storage.getCurrentTrip().id;
		sendPostJSONRequest(backendEndpoint + tripShare + tripID, '')
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('Такой поездки не существует'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('Нужно войти в систему'));
				}
				if (response.status === 400) {
					return Promise.reject(new Error('Ошибка запроса'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.text())
			.then(response => {
				const link = backendEndpoint + response.substring(1, response.length - 1);
				storage.setShareTripLink(link);
				dispatcher.notify(newShareTripLink());
			});
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	initTripEditPage = (metadata: NumID) => {
		const { ID } = metadata;
		this.#getTrip(ID.toString()).then((trip: Trip) => {
			storage.storeCurrentTrip(trip);
			dispatcher.notify(newGetTripResult(ID));
		});
	};

	addCurrentTripPlace = (metadata: SightDay) => {
		const trip = storage.getCurrentTrip();
		trip.sights.push(metadata.sight);
		storage.storeCurrentTrip(trip);
		const tripSend = adoptForSend(trip);
		this.#updateTrip(tripSend, trip.id).then(tripResponse => {
			storage.storeCurrentTrip(tripResponse);
			dispatcher.notify(rerenderTripCards(true));
		});
	};

	deleteCurrentTripPlace = (metadata: CardOrderAndDay) => {
		const trip = storage.getCurrentTrip();
		trip.sights.splice(metadata.cardId + 1, 1); // +1 becuse of fake data
		storage.storeCurrentTrip(trip);
		const tripSend = adoptForSend(trip);
		this.#updateTrip(tripSend, trip.id).then(tripResponse => {
			storage.storeCurrentTrip(tripResponse);
			dispatcher.notify(rerenderTripCards(true));
		});
	};

	updateCurrentTripInfo = (metadata: TripInfo) => {
		const trip = storage.getCurrentTrip();
		trip.description = metadata.description;
		storage.storeCurrentTrip(trip);
		const tripSend = adoptForSend(trip);
		this.#updateTrip(tripSend, trip.id).then(() => {
			router.go(pathsURLfrontend.root);
		});
	};

	createTrip = (metadata: TripInfo) => {
		const trip = storage.getCurrentTrip();
		const tripSend = adoptForCreate(trip);
		tripSend.title = metadata.title;
		tripSend.description = metadata.description;
		// отправка обновления
		this.#addTrip(tripSend).then(response => {
			storage.addLastTripId(Number(response.id));
			router.go(
				createFrontendQueryParams(pathsURLfrontend.trip, [
					{
						key: paramsURLfrontend.id,
						value: response.id,
					},
				])
			);
			dispatcher.notify(createTripEdit(response.id, true));
		});
	};

	deleteTrip = () => {
		const { id } = storage.getCurrentTrip();
		storage.clearCurrentTrip();
		sendDeleteJSONRequest(backendEndpoint + tripURI + id)
			.then(response => {
				if (response.status === 200) {
					return Promise.resolve(response);
				}
				return Promise.reject(new Error(String(`response ended with, ${response.status}`)));
			})
			.then(() => {
				router.go(pathsURLfrontend.root);
			});
	};

	#addTrip = (data: TripFormInfo): Promise<Trip> =>
		sendPostJSONRequest(backendEndpoint + postTripURI, data)
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
			.then(response => response);

	#updateTrip = (data: TripFormInfo, tripId: string): Promise<Trip> =>
		sendPatchJSONRequest(backendEndpoint + tripURI + tripId, data)
			.then(response => {
				if (response.status === 400) {
					return Promise.reject(new Error('Bad request'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('Нужно войти в систему'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());

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
