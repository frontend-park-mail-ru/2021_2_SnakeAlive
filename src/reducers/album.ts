import { dispatcher, EventType, Token, UUID } from '@/dispatcher';
import {
	sendDeleteJSONRequest,
	sendGetJSONRequest,
	sendPatchJSONRequest,
	sendPostFileRequest,
	sendPostJSONRequest,
} from '@/http';
import {
	albumURI,
	backendEndpoint,
	paramsURLfrontend,
	pathsURLfrontend,
	upload,
} from '@/constants';
import { storage } from '@/storage';
import { initErrorPageRequest } from '@/actions/page';
import { newSetMainHeaderRequest } from '@/actions/header';
import { newGetAlbumResult, renderAlbumPhotos, uploadError } from '@/actions/album';
import { Album, GotAlbumInterface } from '@/models/album';
import { AlbumInfo, AlbumUpdateInfo, File, IDState } from '@/dispatcher/metadata_types';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { adoptGotAlbum } from '@/adapters/album';
import { albumURIsingle } from '@/constants/uris';

export default class AlbumReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_ALBUM_REQUEST, this.initAlbumPage),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
			dispatcher.register(EventType.ADD_ALBUM_PHOTOS, this.addPhotos),
			dispatcher.register(EventType.DELETE_ALBUM_PHOTOS, this.deletePhotos),
			dispatcher.register(EventType.UPDATE_ALBUM_INFO, this.updateInfo),
			dispatcher.register(EventType.DELETE_ALBUM, this.deleteAlbum),
		];
	};

	destroy = () => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	initAlbumPage = (metadata: IDState) => {
		dispatcher.notify(newSetMainHeaderRequest());
		storage.storeAlbum(<Album>{});
		const { ID, state } = metadata;
		this.#getAlbum(ID)
			.then((album: GotAlbumInterface) => {
				storage.storeAlbum(adoptGotAlbum(album));
				dispatcher.notify(newGetAlbumResult(state));
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	addPhotos = (photo: File) => {
		this.#sendPhotos(photo.data).then(nameObj => {
			this.#sendAlbumInfo(this.#addPhoto(storage.getAlbum(), nameObj.filename)).then(
				(album: GotAlbumInterface) => {
					storage.storeAlbum(adoptGotAlbum(album));
					dispatcher.notify(renderAlbumPhotos(true));
				}
			);
		}).catch((err: Error) => {
			dispatcher.notify(uploadError(err.message))
		});
	};

	deletePhotos = (name: UUID) => {
		// на delete не вызывать рендер, ставится display: none в самой фотке
		this.#sendAlbumInfo(this.#deletePhoto(storage.getAlbum(), name.ID)).then(
			(album: GotAlbumInterface) => {
				storage.storeAlbum(adoptGotAlbum(album));
			}
		);
	};

	updateInfo = (data: AlbumUpdateInfo) => {
		const isFirst = window.location.href.split('?').length <= 1;

		this.#sendAlbumInfo(data).then((album: GotAlbumInterface) => {
			storage.storeAlbum(adoptGotAlbum(album));
			if (data.actionAfter) {
				data.actionAfter(album.id.toString());
			}
		});
	};

	deleteAlbum = () => {
		const { tripId } = storage.getAlbum();
		sendDeleteJSONRequest(backendEndpoint + albumURI + storage.getAlbum().id)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(new Error('не удален альбом'));
				}
				return Promise.resolve(response);
			})
			.then(() => {
				router.go(
					createFrontendQueryParams(pathsURLfrontend.trip, [
						{
							key: paramsURLfrontend.id,
							value: tripId.toString(),
						},
					])
				);
			});
	};

	#addPhoto = (album: Album, photoName: string): Album => {
		const copiedAlbum = album;
		if (album.photos !== null) {
			copiedAlbum.photos.push(photoName);
			return copiedAlbum;
		}
		copiedAlbum.photos = [photoName];
		return copiedAlbum;
	};

	#deletePhoto = (album: Album, photoName: string): Album => {
		const indexPhoto = album.photos.indexOf(photoName);
		if (indexPhoto !== -1) {
			album.photos.splice(indexPhoto, 1);
		}
		return album;
	};

	#sendAlbumInfo = (data: AlbumInfo): Promise<GotAlbumInterface> => {
		// значит только что созданная форма
		if (window.location.href.split('?').length <= 1) {
			console.log(data);
			const sendData = <any>data;
			sendData.trip_id = storage.getAlbumTripId();
			if (!sendData.trip_id) {
				sendData.trip_id = 42;
			}
			sendData.user_id = storage.getProfile().meta.id;
			return sendPostJSONRequest(backendEndpoint + albumURIsingle, sendData)
				.then(response => {
					if (response.status !== 200) {
						return Promise.reject(new Error('не отправлена информация об альбоме'));
					}
					return Promise.resolve(response);
				})
				.then(response => {
					return response.json();
				});
		}
		return sendPatchJSONRequest(backendEndpoint + albumURI + storage.getAlbum().id, data)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(new Error('не отправлена информация об альбоме'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
	};

	#getAlbum = (id: string): Promise<GotAlbumInterface> =>
		sendGetJSONRequest(backendEndpoint + albumURI + id)
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

	#sendPhotos = (photos: FormData): Promise<{ filename: string }> =>
		sendPostFileRequest(backendEndpoint + upload, photos)
			.then(response => {
				if (response.status === 418) {
					return Promise.reject(new Error('проблемы с интернет-соединением'));
				}
				if (response.status === 413) {
					return Promise.reject(new Error('слишком большое изображение'));
				}
				if (response.status !== 200) {
					return Promise.reject(new Error('что-то пошло не так'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
}
