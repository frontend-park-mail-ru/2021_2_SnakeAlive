import {
	GetProfileResponse,
	Profile,
	ProfileMetadata,
	UpdateProfileMetadataRequest,
	UpdateProfileMetadataResponse,
} from '@/models/profile';
import { sendGetJSONRequest, sendPatchJSONRequest, sendPostFileRequest } from '@/http';
import { backendEndpoint, profile } from '@/constants';
import {
	adaptGetProfileResponse,
	adaptUpdateProfileMetadataRequest,
	adaptUpdateProfileMetadataResponse,
} from '@/adapters/profile';
import { storage } from '@/storage';
import { DataType, dispatcher, EventType, File, Token, UpdateProfile } from '@/dispatcher';
import { initErrorPageRequest, newGetProfileRequest, newGetProfileResponse } from '@/actions';
import { UserMetadata } from '@/models';

export default class ProfileReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [
			dispatcher.register(EventType.GET_PROFILE_REQUEST, this.getProfile),
			dispatcher.register(EventType.UPDATE_PROFILE_METADATA_REQUEST, this.updateProfileMetadata),
			dispatcher.register(EventType.UPDATE_PROFILE_PHOTO_REQUEST, this.updateProfilePhoto),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	}

	init = (): void => {
		this.#tokens = [];
	};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	getProfile = (metadata: DataType): void => {
		// this.#sendGetProfile()
		// 	.then((response: GetProfileResponse) => {
		// 		storage.storeProfile(adaptGetProfileResponse(response));
		// 		dispatcher.notify(newGetProfileResponse());
		// 	})
		// 	.catch((error: Error) => {
		// 		dispatcher.notify(initErrorPageRequest(error));
		// 	});

		storage.storeProfile(<Profile>{
			profileImage: 'https://pbs.twimg.com/profile_images/915168817675931648/W9tXUyfM_400x400.jpg',
			meta: <ProfileMetadata>{
				name: 'Никита',
				surname: 'Черных',
				email: 'asd@mail.ru',
			},
		});
		dispatcher.notify(newGetProfileResponse());
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
		sendPostFileRequest(backendEndpoint + profile, request).then(response => {
			if (response.status === 404) {
				return Promise.reject(new Error('На сайте нет такой страницы'));
			}
			if (response.status === 401) {
				return Promise.reject(new Error('Нужно войти в систему'));
			}
			return Promise.resolve(response);
		});
}
