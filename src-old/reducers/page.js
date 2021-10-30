import CountryReducer from './country.js';
import { initPageRequest, newInitCountryRequest } from '../actions/index.js';
import { CountryCardsHolderView, CountryHolderView } from '../view/index.js';

export default class PageReducer {
	#dispatcher = {};

	#storage = {};

	constructor(dispatcher, storage) {
		this.#dispatcher = dispatcher;
		this.#storage = storage;
	}

	init() {
		this.#dispatcher.register(initPageRequest, this.createInitPage);
	}

	createInitPage() {
		console.log(this);
		const countryReducer = new CountryReducer(this.#storage, this.#dispatcher);
		countryReducer.init();

		const countryHolderView = new CountryHolderView(this.#storage, this.#dispatcher);
		countryHolderView.init();

		const countryCardsHolderView = new CountryCardsHolderView(this.#storage, this.#dispatcher);
		countryCardsHolderView.init();
	}
}
