import { dispatcher, EventType, Token } from '@/dispatcher';
import { router } from '@/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { createFrontendQueryParams } from '@/router/router';
import BasicView from '@/view/view';
import { newSetMainHeaderRequest } from '@/actions/header';
import { storage } from '@/storage';
import { IsTrue } from '@/dispatcher/metadata_types';
import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import { initTripForm } from '@/components/trip/trip_form';

export class AlbumCardInTrip {
	#id = -1;

	#PP = -1;

	createCard = (id: string, PP: number): void => {
		this.#id = Number(id);
		this.#PP = PP;
		if (Number.isNaN(this.#id)) {
			throw new Error('album id converted to NaN');
		}

		// id="delete_button_{{ this.id }}_{{this.PP}}"
		// навешивание обработчиков на внутри сего места (надо бы протестить)

		const goBtn = document.getElementById(`go_album_${this.#id}_${this.#PP}`);
		if (goBtn !== null) {
			console.log(goBtn.id);
			goBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					router.go(
						createFrontendQueryParams(pathsURLfrontend.album, [
							{
								key: paramsURLfrontend.id,
								value: String(this.#id),
							},
						])
					);
				},
				false
			);
		}

		const goBtnEdit = document.getElementById(`go_album_edit_${this.#id}_${this.#PP}`);
		if (goBtnEdit !== null) {
			console.log(goBtnEdit.id);
			goBtnEdit.addEventListener(
				'click',
				event => {
					event.preventDefault();
					router.go(
						createFrontendQueryParams(pathsURLfrontend.album, [
							{
								key: paramsURLfrontend.id,
								value: String(this.#id),
							},
							{
								key: paramsURLfrontend.edit,
								value: String(1),
							},
						])
					);
				},
				false
			);
		}
	};
}

export class PhotosView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#photo_view');
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.RENDER_ALBUM_PHOTOS, this.renderPhotos),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	renderPhotos = (state: IsTrue) => {
		console.log('render photos ', storage.getAlbum().photos, 'state', state.isTrue);
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
		// this.setView(tripFormTemplate({ countries: response, isNotNew: false })); // ОТ info: TripFormCreation
		// initTripForm(true);
	};

	destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	#showEditAlbum = (): void => {
		console.log('showEditAlbum');
	};

	#showNotEditAlbum = (): void => {
		console.log('showNotEditAlbum');
	};
}
