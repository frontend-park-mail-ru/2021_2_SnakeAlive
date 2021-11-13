import BasicView from '@/view/view';
import { DataType, dispatcher, EventType, Token } from '@/dispatcher';
import {
	logoutRequest,
	newUpdateProfileMetadataRequest,
	newUpdateProfilePhotoRequest,
} from '@/actions';
import { storage } from '@/storage';
import { Profile } from '@/models/profile';
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

const setListenersOnTrips = (trips: number[]) => {
	trips.forEach(id => {
		// id="go_trip_{{this}}
		const btn = document.getElementById(`go_trip_${id}`);
		if (btn !== null) {
			btn.addEventListener('click', event => {
				event.preventDefault();
				router.go(
					createFrontendQueryParams(pathsURLfrontend.trip, [
						{
							key: paramsURLfrontend.id,
							value: String(id),
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

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	render = (metadata: DataType): void =>
		this.#isProfile ? this.#renderProfile() : this.#renderEdit();

	#renderProfile = (): void => {
		this.#isProfile = true;
		const profile: Profile = storage.getProfile();
		console.log(profile);

		const trips = storage.getLastTrips(); // поездки
		const ifTrips = trips.length > 0;

		this.setView(profileTemplate({ profile, ifTrips, trips }));

		setListenersOnTrips(trips); // поездки

		const editBtn: Button = new Button('#profile__edit_btn');
		editBtn.setOnClick(this.#renderEdit);

		// const logoutBtn: Button = new Button('#profile__logout_btn');
		// logoutBtn.setOnClick(dispatcher.notify(logoutRequest()));

		const logoutBtn = document.querySelector('#profile__logout_btn');
		console.log(logoutBtn);
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
		fileInput.addEventListener('change', (event: Event) => {
			this.#uploadFile();
		});
	};

	#uploadFile = (): void => {
		const fileInput = <HTMLInputElement>document.querySelector('#update_photo_input');
		fileInput.addEventListener('change', () => {
			const uploadFile = new FormData();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			uploadFile.append('avatar', fileInput.files[0]);

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
				// {
				// 	validators: [
				// 		function (): boolean {
				// 			return validateEmail(emailInput.getValue());
				// 		},
				// 	],
				// 	errorSetters: [emailInput],
				// },
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
		// name: string,
		// 	surname: string,
		// 	email: string,
		// 	password: string,
		// 	description?: string
		console.log(storage.getProfile().meta.email);
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
}
