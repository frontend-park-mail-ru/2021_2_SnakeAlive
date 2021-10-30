import BasicView from './view.js';
import {
	getCountryCardsError,
	getCountryCardsResult,
	newGetCountryCardsRequest,
	destroyInnerRequest,
	destroyCountryCardsHolder,
	newDestroyCountryCardsHolder,
} from '../actions/index.js';

class CountryCardsHolderView extends BasicView {
	#storage;

	#dispatcher;

	#tokens = [];

	constructor(storage, dispatcher) {
		super('.card__grid');

		this.#storage = storage;
		this.#dispatcher = dispatcher;
	}

	init() {
		this.#tokens = [
			this.#dispatcher.register(getCountryCardsResult, this.renderCountryCards),
			this.#dispatcher.register(getCountryCardsError, this.renderErrorMessage),
			this.#dispatcher.register(destroyInnerRequest, this.destroy),
		];
	}

	destroy(metadata = {}) {
		this.#tokens.forEach(element => {
			this.#dispatcher.unregister(element);
		});

		this.#dispatcher.notify(newDestroyCountryCardsHolder());

		this.setEmpty();
	}

	renderCountryCards(metadata = {}) {
		const { sights } = Handlebars.templates;
		this.setView(sights(this.#storage.getCountryCards()));
	}

	renderErrorMessage(metadata = {}) {
		this.setView(`<p>${metadata.error}</p>`);
	}
}

class CountryHolderView extends BasicView {
	#storage;

	#dispatcher;

	#tokens = [];

	constructor(storage, dispatcher) {
		super('#inner');

		this.#storage = storage;
		this.#dispatcher = dispatcher;
	}

	init() {
		this.#tokens = [
			this.#dispatcher.register(getCountryCardsResult, this.renderCountry),
			this.#dispatcher.register(destroyCountryCardsHolder, this.destroy),
		];
	}

	destroy(metadata = {}) {
		this.#tokens.forEach(element => {
			this.#dispatcher.unregister(element);
		});

		this.setEmpty();
	}

	renderCountry(metadata = {}) {
		const countryPageTemplate = Handlebars.templates.country_sights;
		const { name, ID } = this.#storage.getCountry();
		this.setView(countryPageTemplate({ name }));

		this.#dispatcher.notify(newGetCountryCardsRequest(ID));
	}
}

export { CountryHolderView, CountryCardsHolderView };
