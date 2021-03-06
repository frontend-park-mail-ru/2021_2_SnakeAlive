// import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import { dispatcher } from '@/dispatcher';
import {
	deleteTrip,
	createTripFormRequest,
	updateCurrentTripInfo,
	delPlaceFromTrip,
	shareTrip,
	addUserToTrip,
} from '@/actions/trip';
import { newGetReviewsResponse } from '@/actions/review';
import { sendGetJSONRequest } from '@/http';
import {
	backendEndpoint,
	paramsURLfrontend,
	pathsURLfrontend,
	sightsURI,
	tripAddUser,
} from '@/constants';
import tripSightsSelectTemplate from './sight_select.handlebars';
import { Sight } from '@/models';
import { storage } from '@/storage';
import './trip.scss';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { setTextAreaResizeParams } from '@/components/reviews/review_form';
import { Loader } from '@googlemaps/js-api-loader';
import { initSearchView, SearchView } from '@/components/search/search';
import { dropDownHide, dropDownToggle } from '../dropdown/dropdown';

export const GET_COUNTRY_NAME = (id: string) => {
	switch (id) {
		case '1':
			return 'Russia';
		case '2':
			return 'Germany';
		case '3':
			return 'USA';
		case '4':
			return 'UK';
		case '5':
			return 'Chile';
		case '6':
			return 'Nicaragua';
		default:
			return '';
	}
};

const createTrip = (event: Event) => {
	event.preventDefault();

	const { title, text } = getFormInfo();

	if (title === '') {
		setError();
	} else {
		dispatcher.notify(createTripFormRequest(title, text));
	}
};
export const init = (isNew: boolean): void => {
	const submitBtn = document.querySelector('#trip_submit');

	if (submitBtn !== null) {
		submitBtn.addEventListener('click', createTrip, false);
	}

	// красота по отображению
	const textArea = document.querySelector('#comment_text');
	if (textArea !== null) {
		textArea.addEventListener(
			'input',
			setTextAreaResizeParams('comment_text', 'comment_text_hidden', 400),
			false
		);
	}
};

const alert = () => {};

export const initEdit = (): void => {};

export const initSubmitTripBtn = (): void => {
	const askConfirmBtn = document.getElementById('trip-submit');
	if (askConfirmBtn !== null) {
		askConfirmBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();
				const trip = storage.getCurrentTrip();
				dispatcher.notify(updateCurrentTripInfo(trip.title, trip.description));
			},
			false
		);
	} else {
	}
};

export const initDelSightsBtns = (): void => {
	// добавить удаление достопримечательности по нажатию на кнопку
	const deleteSightBtns = document.getElementsByClassName('delite_btn');
	const limit = deleteSightBtns.length;
	for (let i = 0; i < limit; i += 1) {
		deleteSightBtns[i].addEventListener(
			'click',
			event => {
				dispatcher.notify(delPlaceFromTrip(i, 0));
			},
			false
		);
	}
};

export const initDelTripBtn = (): void => {
	const askConfirmBtn = document.getElementById('ask_confirm_button');
	if (askConfirmBtn !== null) {
		askConfirmBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();
				dispatcher.notify(deleteTrip());
			},
			false
		);
	}
};

export const initDescription = (): void => {
	const askConfirmBtn = document.getElementById('comment_text');
	if (askConfirmBtn !== null) {
		askConfirmBtn.addEventListener(
			'input',
			event => {
				event.preventDefault();
				const curtrip = storage.getCurrentTrip();
				curtrip.description = getFormInfo().text;
				storage.storeCurrentTrip(curtrip);
			},
			false
		);
	}
};

export const initAddPartisipantBtn = (): void => {
	const askConfirmBtn = document.getElementById('partisipant_add');
	if (askConfirmBtn !== null) {
		askConfirmBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();
				//show dropdown with linl and instructiom
			},
			false
		);
	}
	const addUserBtn = document.getElementById('add_user_btn');
	if (addUserBtn !== null) {
		addUserBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();
				const addUserEmail = <HTMLInputElement>document.getElementById('search_trip_user');
				if (addUserEmail !== null) {
					if (addUserEmail) {
						dispatcher.notify(addUserToTrip(addUserEmail.value));
						if (document.getElementById('AddUserDropdown')?.classList.contains('show')) {
							document.getElementById('AddUserDropdown')?.classList.remove('show');
						}
					}
				}
			},
			false
		);
	}
	dropDownToggle('AddUserDropdown', 'partisipant_add_img');
};

export const initShareBtn = (): void => {
	const askConfirmBtn = document.getElementById('share');
	if (askConfirmBtn !== null) {
		askConfirmBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();
				dispatcher.notify(shareTrip());
			},
			false
		);
	}
	dropDownToggle('ShareLinkDropdown', 'share');
};

export const initShareBtnCopy = (): void => {
	const askConfirmBtn = document.getElementById('dropdown_share_link');
	if (askConfirmBtn !== null) {
		askConfirmBtn.addEventListener(
			'click',
			event => {
				event.preventDefault();
				navigator.clipboard.writeText(storage.getShareTripLink());
			},
			false
		);
	}
};

const getFormInfo = (): {
	title: string;
	text: string;
} => {
	let titleSend = '';
	let textSend = '';

	const form = document.querySelector('form');
	if (form !== null) {
		const data = new FormData(form);

		const title = data.get('title');
		if (title) {
			titleSend = title.toString();
		} else {
			titleSend = '';
		}

		const textArea = <HTMLTextAreaElement>document.getElementById('comment_text');
		if (textArea !== null) {
			const text = textArea.value;
			if (text) {
				textSend = text.toString();
			}
		}
	}
	return {
		title: titleSend,
		text: textSend,
	};
};

const setError = () => {
	const err = document.getElementById('error_block');
	if (err !== null) {
		err.style.visibility = 'visible';
		const submitBtn = document.querySelector('#trip_submit');
		if (submitBtn !== null) {
			submitBtn.addEventListener(
				'click',
				event => {
					event.preventDefault();

					const { title, text } = getFormInfo();

					if (title === '') {
						setError();
					} else {
						dispatcher.notify(updateCurrentTripInfo(title, text));
					}
				},
				false
			);
		}
	}
};
