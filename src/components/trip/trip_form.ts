// import tripFormTemplate from '@/components/trip/trip_form.handlebars';
import { dispatcher } from '@/dispatcher';
import { addCurrentTripPlace, deleteTrip, createTripFormRequest } from '@/actions/trip';
import { newGetReviewsResponse } from '@/actions/review';
import { sendGetJSONRequest } from '@/http';
import { backendEndpoint, paramsURLfrontend, pathsURLfrontend, sightsURI } from '@/constants';
import tripSightsSelectTemplate from './sight_select.handlebars';
import { Sight } from '@/models';
import { storage } from '@/storage';
import './trip.scss';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { setTextAreaResizeParams } from '@/components/reviews/review_form';
import { Loader } from "@googlemaps/js-api-loader"
import { initSearchView, SearchView } from '@/components/search/search';

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
export const init = (isNew: boolean): void => {
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
					console.log("Создаем поездку", title, text)
					dispatcher.notify(createTripFormRequest(title, text))
				}
			},
			false
		);
	}
}

export const lockTripName = (): void => {
	const { title, text } = getFormInfo();
	const tripTitle = document.getElementById('#title')
	tripTitle?.ariaDisabled
}

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
	}
};

