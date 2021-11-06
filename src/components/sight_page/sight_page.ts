import placeIcon from '../../../image/icon/place.svg';
// import { createReviewForm } from '@/components/reviews/review_form';
import sightTemplate from './sight_page.handlebars';
import { Sight } from '@/models/sight';
import form from '../reviews/review_form.handlebars';

import '../reviews/review.scss';
// import '../reviews/review.scss';

// id: string;
// name: string;
// description: string;
// country: string;
// rating: string;
// tags: Array<string>;

import './sight_page.scss';
import testPhoto from '@/../image/moscow_city_1.jpeg';

export const createSightTemplate = (data: Sight): string => {
	const parent = document.createElement('div');
	// + добавление иконки сюда же
	const dataCopied = <any>data;
	dataCopied.testPhoto = testPhoto;
	parent.innerHTML = sightTemplate(dataCopied);

	const formPlace = parent.querySelector('#sight_page__review_form_place');
	if (formPlace !== null) {
		formPlace.innerHTML = form();
	}

	// тут еще просмотр фотографий нужно организовать

	return parent.innerHTML;
};
