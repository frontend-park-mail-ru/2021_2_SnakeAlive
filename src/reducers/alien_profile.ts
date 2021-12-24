import {
	AlienProfileTrip,
	GetProfileResponse,
} from '@/models/profile';
import {
	sendGetJSONRequest,
} from '@/http';
import {
	backendEndpoint,
	tripURI,
} from '@/constants';
import {
	adaptGetProfileResponse,
	adoptAlienProfileTrips, // adoptAlienProfileAlbums, adoptAlienProfileTrips,
} from '@/adapters/profile';
import { storage } from '@/storage';
import { dispatcher, EventType, Token, UUID } from '@/dispatcher';
import {
	newGetAlienProfileResponse,
} from '@/actions/profile';
import { initErrorPageRequest } from '@/actions/page';
import { newSetMainHeaderRequest } from '@/actions/header';
import { alienUser, user } from '@/constants/uris';

export const sendGetProfile = (id: string): Promise<GetProfileResponse> =>
	sendGetJSONRequest(backendEndpoint + alienUser + id)
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

export default class AlienProfileReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [
			dispatcher.register(EventType.GET_ALIEN_PROFILE_REQUEST, this.getProfile),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	init = (): void => {};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	getProfile = (metadata: UUID): void => {
		dispatcher.notify(newSetMainHeaderRequest()); // ???
		sendGetProfile(metadata.ID)
			.then((response: GetProfileResponse) => {
				storage.storeProfile(adaptGetProfileResponse(response));

				this.#getProfileTripsForAlian().then((trips: AlienProfileTrip[]) => {
					storage.storeProfileTrips(adoptAlienProfileTrips(trips, metadata.ID));
					dispatcher.notify(newGetAlienProfileResponse());
				});
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	#getProfileTripsForAlian = (): Promise<AlienProfileTrip[]> =>
		sendGetJSONRequest(backendEndpoint + tripURI + user)
			.then(response => Promise.resolve(response))
			.then(response => response.json());
}
