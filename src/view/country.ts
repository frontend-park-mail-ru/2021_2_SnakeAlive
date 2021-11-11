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
import { isTripEdited } from '@/dispatcher/metadata_types';
import { Sight } from '@/models';
import tripSights from '@/components/trip/trip_sights.handlebars';
import defaultPicture from '../../image/moscow_city_1.jpeg';
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

	rerenderCards = () => {
		this.setEmpty();
		this.#cards = [];

		const cards = storage.getCountryCardsMin();
		const cardsArray: minCardInfo[][] = [cards];

		this.setView(tripSights({ sights: cardsArray }));

		cardsArray.forEach(day => {
			day.forEach(sight => {
				const card = new SightCardInTrip();
				card.createCard(sight.sight.id, sight.PP);
				this.#cards.push(card);
			});
		});
	};

	renderCountryCards = (metadata: DataType): void => {
		console.log('storage.getCountryCards()', storage.getCountryCards());
		this.setView(JSON.stringify(storage.getCountryCards().cards));
		// this.setView(sights(storage.getCountryCards()));
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

		this.setEmpty();
	};

	renderCountry = (metadata: DataType): void => {
		const { name, ID } = storage.getCountry();
		this.setView(countryPageTemplate({ name }));

		dispatcher.notify(newGetCountryCardsRequest(name, ID));
	};
}

export { CountryHolderView, CountryCardsHolderView };
