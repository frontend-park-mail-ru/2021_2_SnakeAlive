import sights from '@/components/country_page/sights.handlebars';

import countryPageTemplate from '@/components/country_page/country_sights.handlebars';
import { DataType, dispatcher, ErrorMsgData, EventType, Token } from '@/dispatcher';
import BasicView from '@/view/view';
import { storage } from '@/storage';
import tripSights from '@/components/country_page/sights.handlebars';
import { SightCardInTrip } from '@/view/sight_cards';
import { minCardInfo } from '@/models/country';

class CountryCardsHolderView extends BasicView {
	#tokens: Token[];

	#cards: Array<SightCardInTrip>;

	constructor() {
		super('#card-grid-wrapper');

		this.#tokens = [];
		this.#cards = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_COUNTRY_CARDS_RESULT, this.rerenderCards),
			dispatcher.register(EventType.GET_COUNTRY_CARDS_ERROR, this.renderErrorMessage),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	rerenderCards = () => {
		this.setEmpty();
		this.#cards = [];

		const cardsArray = storage.getCountryCardsMin();
		console.log(cardsArray);
// ?

		this.setView(tripSights({ cards: cardsArray }));

		cardsArray.forEach(sight => {
				const card = new SightCardInTrip();
				card.createCard(sight.sight.id, sight.PP);
				this.#cards.push(card);
			});
		console.log(this.#cards);
	};
	//
	// renderCountryCards = (metadata: DataType): void => {
	// 	console.log('storage.getCountryCards()', storage.getCountryCards());
	// 	this.setView(JSON.stringify(storage.getCountryCards().cards));
	// 	// this.setView(sights(storage.getCountryCards()));
	// };

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

		this.setEmpty();
	};

	renderCountry = (metadata: DataType): void => {
		const { name, ID } = storage.getCountry();
		console.log('renderCountry', name, ID);
		this.setView(countryPageTemplate({ name }));

		// dispatcher.notify(newGetCountryCardsRequest(name,ID));
	};
}

export { CountryHolderView, CountryCardsHolderView };
