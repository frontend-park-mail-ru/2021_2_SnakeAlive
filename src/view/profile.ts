import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import {
	logoutRequest,
	newUpdateProfileMetadataRequest,
	newUpdateProfilePhotoRequest,
} from '@/actions/profile';
import { storage } from '@/storage';
import { Profile, ProfileAlbum, ProfileTrip } from '@/models/profile';
import profileTemplate from '@/templates/profile.handlebars';
import profileEditTemplate from '@/templates/profile_edit.handlebars';
import Button from '@/components/minified/button/button';
import Input from '@/components/minified/input/input';
import {
	validateElements,
	validateEqual,
	validateLength,
	validateNotEmpty,
} from '@/validators/common';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import horisontalScroll from '../components/horizontal_scroll/horisontal_scroll.handlebars';
import { newSetEmptyHeaderRequest, newSetMainHeaderStrongRequest } from '@/actions/header';

export const setListenersOnCards = (
	name: string,
	cards: ProfileTrip[] | ProfileAlbum[],
	pathToGo: pathsURLfrontend
) => {
	cards.forEach(trip => {
		// trip="go_trip_{{this}}
		// const btn = document.getElementById(`go_${name}_${trip.id}`);
		const btn = document.getElementById(trip.htmlId);
		if (btn !== null) {
			btn.addEventListener('click', event => {
				event.preventDefault();
				router.go(
					createFrontendQueryParams(pathToGo, [
						{
							key: paramsURLfrontend.id,
							value: String(trip.id),
						},
					])
				);
			});
		}
	});
};

export default class ProfileView extends BasicView {
	#tokens: Token[];

	#isProfile: boolean;

	constructor() {
		super('#content');

		this.#tokens = [];

		this.#isProfile = true;
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_PROFILE_RESPONSE, this.render),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	render = (): void => {
		dispatcher.notify(newSetEmptyHeaderRequest(true), "renderViewProfile");
		this.#isProfile ? this.#renderProfile() : this.#renderEdit();
	}

	#renderProfile = (): void => {
		this.#isProfile = true;
		const profile: Profile = storage.getProfile();

		const trips = storage.getProfileTrips(); // поездки
		const albums = storage.getProfileAlbums(); // альбомы
		this.setView(profileTemplate({ profile, trips, albums }));

		this.#createScrolls(albums);

		setListenersOnCards('trip', trips, pathsURLfrontend.trip); // поездки
		setListenersOnCards('album', albums, pathsURLfrontend.album); // поездки

		const editBtn: Button = new Button('#profile__edit_btn');
		editBtn.setOnClick(this.#renderEdit);

		// const logoutBtn: Button = new Button('#profile__logout_btn');
		// logoutBtn.setOnClick(dispatcher.notify(logoutRequest()));

		const logoutBtn = document.querySelector('#profile__logout_btn');
		if (logoutBtn !== null) {
			logoutBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();
					dispatcher.notify(logoutRequest());
				},
				false
			);
		}
	};

	#renderEdit = (): void => {
		this.#isProfile = false;
		const profile: Profile = storage.getProfile();

		this.setView(profileEditTemplate(profile));

		const updatePhoto: Button = new Button('#update_photo');
		updatePhoto.setOnClick(this.#uploadFile);

		const updateProfile: Button = new Button('#update_profile');
		updateProfile.setOnClick(this.#updateProfile);

		const backBtn: Button = new Button('#back');
		backBtn.setOnClick(this.#renderProfile);

		const fileInput = <HTMLInputElement>document.querySelector('#update_photo');
		fileInput.addEventListener('change', () => {
			this.#uploadFile();
		});
	};

	#uploadFile = (): void => {
		const fileInput = <HTMLInputElement>document.querySelector('#update_photo_input');
		fileInput.addEventListener('change', () => {
			const uploadFile = new FormData();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			uploadFile.append('file', fileInput.files[0]);

			dispatcher.notify(newUpdateProfilePhotoRequest(uploadFile));
		});
		fileInput.click();
	};

	#updateProfile = (): void => {
		const nameInput: Input = new Input('#name_holder', 'input-error-red');
		const surnameInput: Input = new Input('#surname_holder', 'input-error-red');
		const passInput: Input = new Input('#password_holder', 'input-error-red');
		const repeatedPassInput: Input = new Input('#repeated_password_holder', 'input-error-red');
		// const emailInput: Input = new Input('#email_holder', 'input-error-red');

		if (
			!validateElements([
				{
					validators: [
						function (): boolean {
							return validateNotEmpty(nameInput.getValue());
						},
					],
					errorSetters: [nameInput],
				},
				{
					validators: [
						function (): boolean {
							return validateNotEmpty(surnameInput.getValue());
						},
					],
					errorSetters: [surnameInput],
				},
				{
					validators: [
						function (): boolean {
							return validateEqual(passInput.getValue(), repeatedPassInput.getValue());
						},
					],
					errorSetters: [passInput, repeatedPassInput],
				},
				{
					validators: [
						function (): boolean {
							if (validateNotEmpty(passInput.getValue())) {
								return true;
							}

							return validateLength(passInput.getValue(), 8);
						},
					],
					errorSetters: [passInput],
				},
			])
		) {
			return;
		}
		dispatcher.notify(
			newUpdateProfileMetadataRequest(
				nameInput.getValue(),
				surnameInput.getValue(),
				// emailInput.getValue(),
				storage.getProfile().meta.email,
				passInput.getValue(),
				'no description now'
			)
		);
	};

	#createScrolls = (albums: ProfileAlbum[]) => {
		albums.forEach(album => {
			const place = document.getElementById(`photo_scroll_${album.htmlId}`);
			if (place !== null) {
				const pages: Array<{
					picture: string;
				}> = [];
				if (album.photos) {
					album.photos.forEach(photo => {
						pages.push({
							picture: photo,
						});
					});
				}
				place.innerHTML = horisontalScroll({ pages });
			}
		});
	};
}
