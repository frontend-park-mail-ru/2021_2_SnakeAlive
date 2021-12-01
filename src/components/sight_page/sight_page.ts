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

export const createSightTemplate = (data: Sight): string => {

	const parent = document.createElement('div');
	parent.innerHTML = sightTemplate(data);
	return parent.innerHTML;
};
