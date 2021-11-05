// import BasicView from './view';
// import {
// 	getCountryCardsError,
// 	getCountryCardsResult,
// 	newGetCountryCardsRequest,
// 	destroyInnerRequest,
// 	destroyCountryPage,
// 	newDestroyCountryPage,
// 	DESTROY_CURRENT_PAGE,
// 	newSetEmptyHeaderResponse,
// 	newSetMainHeaderRequest,
// } from '@/actions';
// import { storage } from '@/storage';
// import { DataType, dispatcher, ErrorMessage, EventType, Token } from '../dispatcher';

import sights from '@/templates/sights.handlebars';

import countryPageTemplate from '@/templates/country_sights.handlebars';
import { DataType, dispatcher, ErrorMsgData, EventType, Token } from '@/dispatcher';
import BasicView from '@/view/view';
import { storage } from '@/storage';
import {
	destroyCurrentPage,
	newGetCountryCardsRequest,
	newSetEmptyHeaderResponse,
} from '@/actions';

class CountryCardsHolderView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('.card__grid');

		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_COUNTRY_CARDS_RESULT, this.renderCountryCards),
			dispatcher.register(EventType.GET_COUNTRY_CARDS_ERROR, this.renderErrorMessage),
			// dispatcher.register(destroyCountryPage, this.destroy),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	renderCountryCards = (metadata: DataType): void => {
		this.setView(sights(storage.getCountryCards()));
	};

	renderErrorMessage = (metadata: DataType): void => {
		const event = <ErrorMsgData>metadata;
		this.setView(`<p>${event.error}</p>`);
	};
}

class CountryHolderView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');

		this.#tokens = [];
	}

	init() {
		this.#tokens = [
			dispatcher.register(EventType.INIT_COUNTRY_RESPONSE, this.renderCountry),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	}

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		dispatcher.notify(destroyCurrentPage());

		this.setEmpty();
	};

	renderCountry = (metadata: DataType): void => {
		const { name, ID } = storage.getCountry();
		this.setView(countryPageTemplate({ name }));

		dispatcher.notify(newGetCountryCardsRequest(name, ID));
	};
}

export { CountryHolderView, CountryCardsHolderView };
