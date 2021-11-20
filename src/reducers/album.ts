import { dispatcher, EventType, Token, UUID } from '@/dispatcher';
import { sendDeleteJSONRequest, sendGetJSONRequest, sendPostFileRequest } from '@/http';
import { albumURI, backendEndpoint } from '@/constants';
import { storage } from '@/storage';
import { initErrorPageRequest } from '@/actions/page';
import { newSetMainHeaderRequest } from '@/actions/header';
import { newGetAlbumResult, renderPhotos } from '@/actions/album';
import { Album } from '@/models/album';
import { photoURI } from '@/constants/uris';
import { File, IDState } from '@/dispatcher/metadata_types';

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
