import placeIcon from '../../../image/icon/place.webp';
import sightTemplate from './sight_page.handlebars';
import { Sight, SightAdoptedForPage } from '@/models/sight';

import '../reviews/review.scss';
import '../../index.scss';

import './sight_page.scss';

export const createSightTemplate = (data: SightAdoptedForPage): string => {
	const parent = document.createElement('div');
	parent.innerHTML = sightTemplate(data);
	return parent.innerHTML;
};
