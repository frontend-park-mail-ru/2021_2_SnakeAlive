import countryPageTemplate from '@/components/country_page/country_sights.handlebars';
import { DataType, dispatcher, ErrorMsgData, EventType, NamedUUID, Token, UUID } from '@/dispatcher';
import BasicView from '@/view/view';
import { storage } from '@/storage';
import tripSights from '@/components/country_page/sights.handlebars';
import { SightCardInTrip } from '@/view/sight_cards';
import { newGetTagCardsResult } from '@/actions/tag';

class TagCardsHolderView extends BasicView {
	#tokens: Token[];

	#cards: Array<SightCardInTrip>;

	constructor() {
		super('#card-grid-wrapper');

		this.#tokens = [];
		this.#cards = [];
	}

	init = () => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TAG_CARDS_RESULT, this.rerenderCards),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	rerenderCards = () => {
		this.setEmpty();
		this.#cards = [];

		const cardsArray = storage.getSightsCardsMin();

		this.setView(tripSights({ cards: cardsArray }));

		cardsArray.forEach(sight => {
			const card = new SightCardInTrip();
			card.createCard(sight.sight.id, sight.PP, sight.sight.tags);
			this.#cards.push(card);
		});
	};
}

class TagHolderView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');

		this.#tokens = [];
	}

	init() {
		this.#tokens = [
			dispatcher.register(EventType.INIT_TAG_RESULT, this.renderCountry),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	}

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	renderCountry = (metadata: UUID): void => {
		this.setView(countryPageTemplate({ name: `по тегу ${metadata.ID}` }));
		dispatcher.notify(newGetTagCardsResult());
	};
}

export { TagHolderView, TagCardsHolderView };
