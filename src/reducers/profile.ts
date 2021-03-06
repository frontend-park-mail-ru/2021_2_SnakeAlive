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
import { router } from '@/router';
import { user } from '@/constants/uris';

export default class ProfileReducer {
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
		this.#sendGetProfile()
			.then((response: GetProfileResponse) => {
				storage.storeProfile(adaptGetProfileResponse(response));

				this.#getProfileTrips().then((trips: ProfileTrip[]) => {
					storage.storeProfileTrips(adoptProfileTrips(trips));
					this.#getProfileAlbums().then((albums: ProfileAlbum[]) => {
						storage.storeProfileAlbums(adoptProfileAlbums(albums));

						dispatcher.notify(newGetProfileResponse());
					});
				});
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	updateProfileMetadata = (metadata: UpdateProfile): void => {
		this.#sendUpdateProfileMetadata(adaptUpdateProfileMetadataRequest(metadata))
			.then((response: UpdateProfileMetadataResponse) => {
				storage.storeProfileMetadata(adaptUpdateProfileMetadataResponse(response));
				dispatcher.notify(newGetProfileResponse());
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	updateProfilePhoto = (metadata: File): void => {
		this.#sendUpdateProfilePhoto(metadata.data)
			.then(obj => {
				const updatedProfile = storage.getProfile().meta;
				updatedProfile.avatar = obj.filename;
				this.#sendUpdateProfileMetadata(updatedProfile).then(() => {
					dispatcher.notify(newGetProfileRequest());
				});
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	sendLogoutRequest = (): void => {
		sendDeleteJSONRequest(backendEndpoint + logout).then(request => {
			if (request.ok) {
				router.go(pathsURLfrontend.root);
			} else {
				// console.log('problems in logout');
			}
		});
	};

	#sendGetProfile = (): Promise<GetProfileResponse> =>
		sendGetJSONRequest(backendEndpoint + profile)
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('???? ?????????? ?????? ?????????? ????????????????'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('?????????? ?????????? ?? ??????????????'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());

	#sendUpdateProfileMetadata = (
		request: UpdateProfileMetadataRequest
	): Promise<UpdateProfileMetadataResponse> =>
		sendPatchJSONRequest(backendEndpoint + profile, request)
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('???? ?????????? ?????? ?????????? ????????????????'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('?????????? ?????????? ?? ??????????????'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());

	#sendUpdateProfilePhoto = (request: FormData): Promise<{ filename: string }> =>
		sendPostFileRequest(backendEndpoint + upload, request)
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('???? ?????????? ?????? ?????????? ????????????????'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('?????????? ?????????? ?? ??????????????'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());

	#getProfileTrips = (): Promise<ProfileTrip[]> =>
		sendGetJSONRequest(backendEndpoint + tripURI + user)
			.then(response => Promise.resolve(response))
			.then(response => response.json());

	#getProfileAlbums = (): Promise<ProfileAlbum[]> =>
		sendGetJSONRequest(backendEndpoint + albumURI + user)
			.then(response => Promise.resolve(response))
			.then(response => response.json());
}
