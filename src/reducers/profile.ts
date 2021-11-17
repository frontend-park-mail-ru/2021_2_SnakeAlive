import {
	GetProfileResponse,
	Profile,
	ProfileMetadata,
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
	backendEndpoint,
	backendFileEndpoint,
	logout,
	pathsURLfrontend,
	profile,
	upload,
} from '@/constants';
import {
	adaptGetProfileResponse,
	adaptUpdateProfileMetadataRequest,
	adaptUpdateProfileMetadataResponse,
} from '@/adapters/profile';
import { storage } from '@/storage';
import { DataType, dispatcher, EventType, File, Token, UpdateProfile } from '@/dispatcher';
import {
	initErrorPageRequest,
	newGetProfileRequest,
	newGetProfileResponse,
	newSetEmptyHeaderRequest,
} from '@/actions';
import { UserMetadata } from '@/models';
import { router } from '@/router';

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

	init = (): void => {};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	getProfile = (metadata: DataType): void => {
		dispatcher.notify(newSetEmptyHeaderRequest(true)); // ???
		this.#sendGetProfile()
			.then((response: GetProfileResponse) => {
				storage.storeProfile(adaptGetProfileResponse(response));
				dispatcher.notify(newGetProfileResponse());
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

	updateProfilePhoto = (metadata: DataType): void => {
		const photo = <File>metadata;
		this.#sendUpdateProfilePhoto(photo.data)
			.then(response => dispatcher.notify(newGetProfileRequest()))
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	sendLogoutRequest = (): void => {
		sendDeleteJSONRequest(backendEndpoint + logout).then(request => {
			if (request.ok) {
				router.go(pathsURLfrontend.root);
			} else {
				console.log('problems in logout');
			}
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

	#sendUpdateProfileMetadata = (
		request: UpdateProfileMetadataRequest
	): Promise<UpdateProfileMetadataResponse> =>
		sendPatchJSONRequest(backendEndpoint + profile, request)
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

	#sendUpdateProfilePhoto = (request: FormData): Promise<Response> =>
		sendPostFileRequest(backendEndpoint + upload, request).then(response => {
			if (response.status === 404) {
				return Promise.reject(new Error('На сайте нет такой страницы'));
			}
			if (response.status === 401) {
				return Promise.reject(new Error('Нужно войти в систему'));
			}
			return Promise.resolve(response);
		});
}
