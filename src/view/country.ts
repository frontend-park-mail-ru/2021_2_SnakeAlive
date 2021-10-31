import BasicView from './view';
import {
	getCountryCardsError,
	getCountryCardsResult,
	newGetCountryCardsRequest,
	destroyInnerRequest,
	destroyCountryPage,
	newDestroyCountryPage, DESTROY_CURRENT_PAGE,
} from '@/actions';
import { storage } from '@/storage';
import { dispatcher, ErrorMessage, EventType, Token } from '../dispatcher';

import * as sights from '@/templates/sights.handlebars';

import * as countryPageTemplate from '@/templates/country_sights.handlebars';

class CountryCardsHolderView extends BasicView {
	#tokens: Token[];

	constructor() {
		// super('.card__grid');
		super(new HTMLElement());

		this.#tokens = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(getCountryCardsResult, this.renderCountryCards),
			dispatcher.register(getCountryCardsError, this.renderErrorMessage),
			dispatcher.register(destroyCountryPage, this.destroy),
			dispatcher.register(DESTROY_CURRENT_PAGE, this.destroy),
		];
	};

	destroy = (metadata: EventType = {}): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	renderCountryCards = (metadata: EventType = {}): void => {
		this.setView(sights(storage.getCountryCards()));
	};

	renderErrorMessage = (metadata: EventType = {}): void => {
		const event = <ErrorMessage>metadata;
		this.setView(`<p>${event.error}</p>`);
	};
}

class CountryHolderView extends BasicView {
	#tokens: Token[];

	constructor() {
		// super('#inner');
		super(new HTMLElement());

		this.#tokens = [];
	}

	init() {
		this.#tokens = [
			dispatcher.register(getCountryCardsResult, this.renderCountry),
			dispatcher.register(destroyInnerRequest, this.destroy),
		];
	}

	destroy = (metadata: EventType = {}): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		dispatcher.notify(newDestroyCountryPage());

		this.setEmpty();
	};

	renderCountry = (metadata: EventType = {}): void => {
		const { name, ID } = storage.getCountry();
		this.setView(countryPageTemplate({ name }));

		dispatcher.notify(newGetCountryCardsRequest(ID));
	};
}

export { CountryHolderView, CountryCardsHolderView };
