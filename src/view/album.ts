import { dispatcher, EventType, Token } from '@/dispatcher';
import { router } from '@/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { createFrontendQueryParams } from '@/router/router';
import BasicView from '@/view/view';
import { newSetMainHeaderRequest } from '@/actions/header';
import { storage } from '@/storage';
import { IsTrue } from '@/dispatcher/metadata_types';

import albumPageTemplate from '@/components/album/album_page.handlebars';
import albumFormTemplate from '@/components/album/album_form.handlebars';
import albumInfoTemplate from '@/components/album/album_info.handlebars';
import albumPhotosTemplate from '@/components/album/album_photos.handlebars';
import '@/components/album/album.scss';
import { initAlbumForm } from '@/components/album/album_form';
import {
	addAlbumPhoto,
	deletePhoto,
	newGetAlbumResult,
	renderAlbumPhotos,
} from '@/actions/album';

import defaultPhoto from '../../image/defaultAlbum.png';

export class PhotosView {
	#tokens: Token[];

	#rightPhotosHolder: HTMLElement | null = null;

	#leftPhotosHolder: HTMLElement | null = null;

	#isInited = false;

	constructor() {
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.RENDER_ALBUM_PHOTOS, this.renderPhotos),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	renderPhotos = (isEdit: IsTrue) => {
		this.#leftPhotosHolder = document.getElementById('album_page__photo_holder_left');
		if (this.#leftPhotosHolder === null) {
			throw Error('not found in html "album_page__photo_holder_left');
		}
		this.#rightPhotosHolder = document.getElementById('album_page__photo_holder_right');
		if (this.#rightPhotosHolder === null) {
			throw Error('not found in html "album_page__photo_holder_right');
		}

		this.#initAddBtn();

		const { photos } = storage.getAlbum();
		if (photos === null) {
			return;
		}

		if (photos.length < 2) {
			const rightPhotosHolder = document.getElementById('album_page__photo_holder_right');
			if (rightPhotosHolder !== null) {
				rightPhotosHolder.innerHTML = albumPhotosTemplate({ photos, isEdit: isEdit.isTrue });
			}
		} else {
			const photosLeft = photos.slice(photos.length / 2);
			const photosRight = photos.slice(0, photos.length / 2);
			if (this.#rightPhotosHolder !== null) {
				this.#rightPhotosHolder.innerHTML = albumPhotosTemplate({
					photos: photosRight,
					isEdit: isEdit.isTrue,
				});
			}
			if (this.#leftPhotosHolder !== null) {
				this.#leftPhotosHolder.innerHTML = albumPhotosTemplate({
					photos: photosLeft,
					isEdit: isEdit.isTrue,
				});
			}
		}

		if (isEdit.isTrue) {
			if (photos) {
				photos.forEach(photo => {
					this.#initDeleteButton(photo);
				});
			}
		}
	};

	#checkLoadedFile = (file: File): Error | null => {
		// провераяем тип файла
		if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type)) {
			return Error('Разрешены только изображения.');
		}
		// проверим размер файла (<2 Мб)
		if (file.size > 2 * 1024 * 1024) {
			return Error('Файл должен быть менее 2 МБ.');
		}
		return null;
	};

	#initAddBtn = () => {
		if (this.#isInited) {
			return;
		}
		this.#isInited = true;

		const addBtn = document.getElementById('add_photos_btn');

		const addInput = <HTMLInputElement>document.getElementById('add_photos_input');
		if (addBtn !== null && addInput !== null) {
			addBtn.addEventListener(
				'click',
				() => {
					addInput.click();
				},
				false
			);

			addInput.addEventListener('change', event => {
				event.preventDefault();
				if (addInput === null) {
					return;
				}
				if (addInput.files === null) {
					return;
				}
				const error = this.#checkLoadedFile(addInput.files[0]);
				if (error !== null) {
					// показать ошибку на странице
					return;
				}

				// отправка файла
				const uploadFile = new FormData();
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				uploadFile.append('file', addInput.files[0]);
				dispatcher.notify(addAlbumPhoto(uploadFile));
			});
		} else {
			throw Error('не найдена кнопка инпута или сам инпут для добавления фото');
		}
	};

	#initDeleteButton = (photoName: string) => {
		const deleteBtn = document.getElementById(`delete_photo_${photoName}`);
		if (deleteBtn !== null) {
			deleteBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					dispatcher.notify(deletePhoto(photoName));
					const photo = document.getElementById(`album_page__photo_holder_place_${photoName}`);
					if (photo !== null) {
						photo.style.display = 'none';
					}
				},
				false
			);
		}
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};
}

export class AlbumView extends BasicView {
	#tokens: Token[];

	#photosView: PhotosView;

	#defaultPhoto = defaultPhoto;

	constructor() {
		super('#content');
		this.#tokens = [];
		this.#photosView = new PhotosView();
		this.#photosView.init();
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_ALBUM_RESPONSE, this.showAlbum),
			dispatcher.register(EventType.CREATE_ALBUM_FORM_REQUEST, this.showEmptyForm),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];

		dispatcher.notify(newSetMainHeaderRequest());
	};

	showAlbum = (state: IsTrue): void => {
		dispatcher.notify(newSetMainHeaderRequest());
		if (state.isTrue) {
			this.#showEditAlbum();
		} else {
			this.#showNotEditAlbum();
		}

		dispatcher.notify(renderAlbumPhotos(state.isTrue));
	};

	showEmptyForm = () => {
		this.setView(albumPageTemplate({ pic: this.#defaultPhoto }));

		const addBtn = document.getElementById('add_photos_btn');
		if (addBtn !== null) {
			addBtn.addEventListener(
				'mouseover',
				() => {
					addBtn.innerText = 'Чтобы добавить фотографии, пожалуйста, создайте альбом';
				},
				false
			);
			addBtn.addEventListener(
				'mouseout',
				() => {
					addBtn.innerText = 'Добавить фотографии';
				},
				false
			);
		}

		const formPlace = document.getElementById('album_page__left_col__info');
		if (formPlace !== null) {
			formPlace.innerHTML = albumFormTemplate();
		}
		initAlbumForm(true);
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	#showEditAlbum = (): void => {
		const album = storage.getAlbum();
		const { title, description } = album;
		this.setView(albumPageTemplate({ pic: this.#defaultPhoto }));
		const formPlace = document.getElementById('album_page__left_col__info');
		if (formPlace !== null) {
			formPlace.innerHTML = albumFormTemplate({
				title,
				description,
				isNotNew: true,
			});
		}
		initAlbumForm(false);
	};

	#showNotEditAlbum = (): void => {
		const album = storage.getAlbum();
		const { title, description } = album;
		this.setView(albumPageTemplate({ pic: this.#defaultPhoto }));
		const infoPlace = document.getElementById('album_page__left_col__info');
		if (infoPlace !== null) {
			infoPlace.innerHTML = albumInfoTemplate({
				title,
				description,
			});
		}

		// go_edit кнопка
		const editBtn = document.getElementById('go_edit');
		if (editBtn !== null) {
			editBtn.addEventListener(
				'click',
				() => {
					dispatcher.notify(newGetAlbumResult(true));
					router.pushHistoryState(
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
				},
				false
			);
		}

		// кнопка сохранить и завершить btn_make_and_go_trip
		const createFinishAndGoBtn = document.getElementById('btn_make_and_go_trip');
		if (createFinishAndGoBtn !== null) {
			createFinishAndGoBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					router.go(
						createFrontendQueryParams(pathsURLfrontend.trip, [
							{
								key: paramsURLfrontend.id,
								value: storage.getAlbum().tripId.toString(),
							},
						])
					);
				},
				false
			);
		}
	};
}
