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
import { deletePhoto, renderPhotos } from '@/actions/album';

class AlbumPhoto {
	#id = '';

	createPhoto = (id: string): void => {
		this.#id = id;

		// id="delete_button_{{ this.id }}_{{this.PP}}"
		// навешивание обработчиков на внутри сего места (надо бы протестить)
		const deleteBtn = document.getElementById(`delete_photo_${this.#id}`);
		if (deleteBtn !== null) {
			deleteBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					dispatcher.notify(deletePhoto(this.#id)); // обработка того что подставляется доменное имя!
					const photo = document.getElementById(`album_page__photo_holder_place_${this.#id}`);
					if (photo !== null) {
						photo.style.display ='none';
					}
				},
				false
			);
		}
	};
}

export class PhotosView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#album_page__photo_holder');
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.RENDER_ALBUM_PHOTOS, this.renderPhotos),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	renderPhotos = (state: IsTrue) => {
		const { photos } = storage.getAlbum();
		console.log('render photos ', photos, 'state', state.isTrue);
		this.setView(albumPhotosTemplate({ isEdit: state.isTrue, photos }));
		if (state.isTrue) {
			photos.forEach((ph) => {
				const photo = new AlbumPhoto();
				photo.createPhoto(ph);
			})
		}
	};

	destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}

export class AlbumView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_ALBUM_RESPONSE, this.showAlbum),
			dispatcher.register(EventType.CREATE_ALBUM_FORM_REQUEST, this.showEmptyForm),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];

		dispatcher.notify(newSetMainHeaderRequest());

		const photosView = new PhotosView();
		photosView.init();
	};

	showAlbum = (state: IsTrue): void => {
		dispatcher.notify(newSetMainHeaderRequest());
		if (state) {
			this.#showEditAlbum();
		} else {
			this.#showNotEditAlbum();
		}
	};

	showEmptyForm = () => {
		console.log('showedEmptyForm');
		this.setView(albumPageTemplate());

		const addBtn = document.getElementById('add_photos_btn');
		if (addBtn !== null) {
			addBtn.addEventListener('mouseover',
				() => {
					addBtn.innerText = "Чтобы добавить фотографии, пожалуйста, создайте альбом";
				}, false);
			addBtn.addEventListener('mouseout',
				() => {
					addBtn.innerText = "Добавить фотографии";
				}, false);
		}

		const formPlace = document.getElementById('album_page__left_col__info');
		if (formPlace !== null) {
			formPlace.innerHTML = albumFormTemplate();
		}
		initAlbumForm(true);
	};

	destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	#showEditAlbum = (): void => {
		const album = storage.getAlbum();
		const { title, description } = album;
		// console.log(albumPageTemplate({
		// 	photosLeft: album.photos.slice(album.photos.length / 2 - 1),
		// 	photosRight: album.photos.slice( - album.photos.length / 2 + 1)
		// }));
		this.setView(albumPageTemplate());
		dispatcher.notify(renderPhotos(true));
		const formPlace = document.getElementById('album_page__left_col__info');
		if (formPlace !== null) {
			formPlace.innerHTML = albumFormTemplate({
				title,
				description,
			});
		}
		initAlbumForm(false);
	};

	#showNotEditAlbum = (): void => {
		console.log('showNotEditAlbum');

		const album = storage.getAlbum();
		const { title, description } = album;
		this.setView(albumPageTemplate());
		dispatcher.notify(renderPhotos(false));
		const infoPlace = document.getElementById('album_page__left_col__info');
		if (infoPlace !== null) {
			infoPlace.innerHTML = albumInfoTemplate({
				title,
				description,
			});
		}
		// go_edit кнопка
	};
}
