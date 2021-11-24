import { dispatcher, EventType, Token, UUID } from '@/dispatcher';
import {
	sendDeleteJSONRequest,
	sendGetJSONRequest,
	sendPostFileRequest,
	sendPostJSONRequest,
} from '@/http';
import { albumURI, backendEndpoint, paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { storage } from '@/storage';
import { initErrorPageRequest } from '@/actions/page';
import { newSetMainHeaderRequest } from '@/actions/header';
import { newGetAlbumResult, renderPhotos } from '@/actions/album';
import { Album } from '@/models/album';
import { photoURI } from '@/constants/uris';
import { AlbumInfo, File, IDState } from '@/dispatcher/metadata_types';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';

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
		const { ID, state } = metadata;
		this.#getAlbum(ID)
			.then((album: Album) => {
				storage.storeAlbum(album);
				dispatcher.notify(newGetAlbumResult(state));
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	addPhotos = (photos: File) => {
		this.#sendPhotos(photos.data).then((album: Album) => {
			storage.storeAlbum(album);
			dispatcher.notify(renderPhotos(true));
			// считаем что фотки можно загрузить только в режиме редактирвоания
		});
	};

	deletePhotos = (name: UUID) => {
		// на delete не вызывать рендер, просто display: none в самой фотке
		const urlDelete = new URL(backendEndpoint + photoURI);
		urlDelete.searchParams.append('album_id', storage.getAlbum().id.toString());
		urlDelete.searchParams.append('name', name.ID);
		this.#sendDeletePhotos(urlDelete.toString()).then((album: Album) => {
			storage.storeAlbum(album);
		});
	};

	updateInfo = (data: AlbumInfo) => {
		this.#sendAlbumInfo(data).then((album: Album) => {
			storage.storeAlbum(album);

			if (window.location.href.split('?').length <= 1) {
				router.go(
					createFrontendQueryParams(pathsURLfrontend.album, [
						{
							key: paramsURLfrontend.id,
							value: storage.getAlbum().id.toString(),
						},
						{
							key: paramsURLfrontend.edit,
							value: '1',
						},
					])
				);
			}
		});
	};

	deleteAlbum = () => {
		sendDeleteJSONRequest(backendEndpoint + albumURI + storage.getAlbum().id)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(new Error('не удален альбом'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json())
			.then(() => {
				router.go(
					createFrontendQueryParams(pathsURLfrontend.trip, [
						{
							key: paramsURLfrontend.id,
							value: storage.getAlbum().tripId.toString(),
						},
					])
				);
			});
	};

	#sendAlbumInfo = (data: AlbumInfo): Promise<Album> => {
		// значит только что созданная форма
		if (window.location.href.split('?').length <= 1) {
			const sendData = <any>data;
			sendData.trip_id = storage.getAlbumTripId();
			return sendPostJSONRequest(backendEndpoint + albumURI, sendData)
				.then(response => {
					if (response.status !== 200) {
						return Promise.reject(new Error('не отправлена информация об альбоме'));
					}
					return Promise.resolve(response);
				})
				.then(response => response.json());
		}
		return sendPostJSONRequest(backendEndpoint + albumURI + storage.getAlbum().id, data)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(new Error('не отправлена информация об альбоме'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
	};

	#getAlbum = (id: string): Promise<Album> =>
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

	#sendPhotos = (photos: FormData): Promise<Album> =>
		sendPostFileRequest(backendEndpoint + photoURI, photos)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(new Error('не загружены фотографии'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());

	#sendDeletePhotos = (url: string): Promise<Album> =>
		sendDeleteJSONRequest(url)
			.then(response => {
				if (response.status !== 200) {
					return Promise.reject(new Error('не удалены фотографии'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());
}
