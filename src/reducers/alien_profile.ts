import {
	AlienProfileTrip,
	GetProfileResponse,
	ProfileAlbum,
	ProfileTrip,
	UpdateProfileMetadataRequest,
	UpdateProfileMetadataResponse,
} from '@/models/profile';
import {
	sendDeleteJSONRequest,
	sendGetJSONRequest,
	sendPatchJSONRequest,
	sendPostFileRequest,
} from '@/http';
import {
	albumURI,
	backendEndpoint,
	logout,
	pathsURLfrontend,
	profile,
	tripURI,
	upload,
} from '@/constants';
import {
	adaptGetProfileResponse,
	adaptUpdateProfileMetadataRequest,
	adaptUpdateProfileMetadataResponse,
	adoptAlienProfileTrips, // adoptAlienProfileAlbums, adoptAlienProfileTrips,
	adoptProfileAlbums,
	adoptProfileTrips,
} from '@/adapters/profile';
import { storage } from '@/storage';
import { dispatcher, EventType, File, NamedUUID, Token, UpdateProfile, UUID } from '@/dispatcher';
import {
	newGetAlienProfileResponse,
	newGetProfileRequest,
	newGetProfileResponse,
} from '@/actions/profile';
import { initErrorPageRequest } from '@/actions/page';
import { newSetEmptyHeaderRequest, newSetMainHeaderRequest } from '@/actions/header';
import { router } from '@/router';
import { alienUser, user } from '@/constants/uris';

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
		this.#sendGetProfile(metadata.ID)
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

	#sendGetProfile = (id: string): Promise<GetProfileResponse> =>
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

	#getProfileTripsForAlian = (): Promise<AlienProfileTrip[]> =>
		sendGetJSONRequest(backendEndpoint + tripURI + user)
			.then(response => Promise.resolve(response))
			.then(response => response.json());
}
