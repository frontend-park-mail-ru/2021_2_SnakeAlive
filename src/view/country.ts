import countryPageTemplate from '@/components/country_page/country_sights.handlebars';
import { DataType, dispatcher, ErrorMsgData, EventType, Token } from '@/dispatcher';
import BasicView from '@/view/view';
import { storage } from '@/storage';
import tripSights from '@/components/country_page/sights.handlebars';
import { SightCardInTrip } from '@/view/sight_cards';
import { TagAdoptedForRender } from '@/models/sight';
import { initDropdown, initTagsBtns } from './tag';
import { destroyCurrentPage } from '@/actions/page';
import { newSetMainHeaderRequest, newSetMainHeaderStrongRequest } from '@/actions/header';
import { AdoptedTag } from '@/models/tags';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { SearchCountry } from '@/models/country';
import { newUpdateTagRequest } from '@/actions/tag';

export const initCountriesBtns = (tags: SearchCountry[]) => {
	tags.forEach(tag => {
		const tegElem = document.getElementById(`country_${tag.id}`);
		if (tegElem !== null) {
			tegElem.addEventListener('click', () => {
				if (tag.numId) {
					router.go(
						createFrontendQueryParams(pathsURLfrontend.country, [
							{
								key: paramsURLfrontend.id,
								value: tag.numId.toString(),
							},
						]),
						tag.name
					);
				}
			});
		}
	});
	tags.forEach(tag => {
		const tegElem = document.getElementById(`dropdown_country_${tag.id}`);
		if (tegElem !== null) {
			tegElem.addEventListener('click', () => {
				if (tag.numId) {
					router.go(
						createFrontendQueryParams(pathsURLfrontend.country, [
							{
								key: paramsURLfrontend.id,
								value: tag.numId.toString(),
							},
						]),
						tag.name
					);
				}
			});
		}
	});
	initDropdown('', 'country');
};

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

		cardsArray.forEach(sight => {
			const tagsAdopted: Array<TagAdoptedForRender> = [];
			sight.sight.tags.forEach(tag => {
				tagsAdopted.push({
					id: tag.id.toString(),
					name: tag.name,
					sightPP: sight.PP,
				});
			});
			// eslint-disable-next-line no-param-reassign
			sight.sight.adoptedTags = tagsAdopted;
		});

		this.setView(tripSights({ cards: cardsArray }));

		cardsArray.forEach(sight => {
			const card = new SightCardInTrip();
			card.createCard(sight.sight.id, sight.PP, sight.sight.adoptedTags);
			this.#cards.push(card);
		});
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
		dispatcher.notify(newSetMainHeaderStrongRequest(), 'init country');
	}

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	renderCountry = (): void => {
		const { translation } = storage.getCountry();
		this.setView(countryPageTemplate({ name: `по стране ${translation}` }));
		this.setView(
			countryPageTemplate({
				name: `по стране ${translation}`,
				tags: storage.getSearchTags().slice(0, 6),
				allTags: storage.getSearchTags().slice(6),
			})
		);
		initTagsBtns(storage.getSearchTags(), (id: string) => {
			router.go(
				createFrontendQueryParams(pathsURLfrontend.tag, [
					{
						key: paramsURLfrontend.tag,
						value: id,
					},
				])
			);
		});
	};
}

export { CountryHolderView, CountryCardsHolderView };
