import {
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
	adoptProfileAlbums,
	adoptProfileTrips,
} from '@/adapters/profile';
import { storage } from '@/storage';
import { dispatcher, EventType, File, Token, UpdateProfile } from '@/dispatcher';
import { newGetProfileRequest, newGetProfileResponse } from '@/actions/profile';
import { initErrorPageRequest } from '@/actions/page';
import { newSetEmptyHeaderRequest } from '@/actions/header';
import { router } from '@/router';
import { user } from '@/constants/uris';

export default class AlienProfileReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [
			dispatcher.register(EventType.GET_PROFILE_REQUEST, this.getProfile),
			dispatcher.register(EventType.UPDATE_PROFILE_METADATA_REQUEST, this.updateProfileMetadata),
			dispatcher.register(EventType.UPDATE_PROFILE_PHOTO_REQUEST, this.updateProfilePhoto),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
			dispatcher.register(EventType.LOGOUT_REQUEST, this.sendLogoutRequest),
		];
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	init = (): void => {};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	getProfile = (): void => {
		dispatcher.notify(newSetEmptyHeaderRequest(true)); // ???
		this.#sendGetProfile()
			.then((response: GetProfileResponse) => {
				storage.storeProfile(adaptGetProfileResponse(response));

				this.#getAlienProfileTrips().then((trips: ProfileTrip[]) => {
					storage.storeProfileTrips(adoptProfileTrips(trips));
					this.#getAlienProfileAlbums().then((albums: ProfileAlbum[]) => {
						storage.storeProfileAlbums(adoptProfileAlbums(albums));

						dispatcher.notify(newGetProfileResponse());
					});
				});
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	#sendGetProfile = (): Promise<GetProfileResponse> =>
		sendGetJSONRequest(backendEndpoint + profile)
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

	#getAlienProfileTrips = (): Promise<ProfileTrip[]> =>
		sendGetJSONRequest(backendEndpoint + tripURI + user)
			.then(response => Promise.resolve(response))
			.then(response => response.json());

	#getAlienProfileAlbums = (): Promise<ProfileAlbum[]> =>
		sendGetJSONRequest(backendEndpoint + albumURI + user)
			.then(response => Promise.resolve(response))
			.then(response => response.json());

}
