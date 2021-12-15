import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import { storage } from '@/storage';
import { TagAdoptedForRender } from '@/models/sight';
import tripSights from '@/components/country_page/sights.handlebars';
import { SightCardInTrip } from '@/view/sight_cards';
import { initDropdown } from '@/view/tag';
import searchPageTemplate from '@/components/search/search_page.handlebars';
import { initSearchView, SearchView } from '@/components/search/search';
import { sendPageSearch } from '@/actions/search';
import { Search } from '@/dispatcher/metadata_types';
import { searchPlaceType } from '@/models/search';

class SearchCardsHolderView extends BasicView {
	// #cards: Array<SightCardInTrip>;

	constructor() {
		super('#card-grid-wrapper');

		// this.#cards = [];
	}

	destroy = (): void => {
		this.setEmpty();
	};

	rerenderCards = () => {
		this.setEmpty();
		// this.#cards = [];

		console.log(storage.getSightsCardsMin());

		const cardsArray = storage.getSightsCardsMin();
		cardsArray.forEach(sight => {
			const tagsAdopted: Array<TagAdoptedForRender> = [];
			if (sight.sight.tags) {
				sight.sight.tags.forEach(tag => {
					tagsAdopted.push({
						id: tag.id.toString(),
						name: tag.name,
						sightPP: sight.PP,
					});
				});
			}
			// eslint-disable-next-line no-param-reassign
			sight.sight.adoptedTags = tagsAdopted;
		});

		this.setView(tripSights({ cards: cardsArray }));

		cardsArray.forEach(sight => {
			const card = new SightCardInTrip();
			card.createCard(sight.sight.id, sight.PP, sight.sight.adoptedTags);
			// this.#cards.push(card);
		});
	};
}

class SearchHolderView extends BasicView {
	#tokens: Token[];

	#search: SearchView | null = null;

	#cardView: SearchCardsHolderView;

	constructor() {
		super('#content');

		this.#tokens = [];

		this.#cardView = new SearchCardsHolderView();
	}

	init() {
		this.#tokens = [
			dispatcher.register(EventType.INIT_EMPTY_SEARCH_PAGE_RESPONSE, this.renderEmptySearchPage),
			dispatcher.register(EventType.GOT_SEARCH_RESULTS, this.checkIfPage),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	}

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	renderEmptySearchPage = (): void => {
		this.setView(
			searchPageTemplate({
				tags: storage.getSearchTags().slice(0, 6),
				allTags: storage.getSearchTags().slice(6),
				countries: storage.getSearchCountries().slice(0, 6),
				allCountries: storage.getSearchCountries().slice(6, 0),
			})
		);
		initDropdown('dropdown_tags'); // ??
		initDropdown('dropdown_countries'); // ??

		// поиск
		const searchPlace = document.getElementById('page-search-place');
		if (searchPlace !== null) {
			searchPlace.innerHTML = initSearchView(searchPlaceType.page, true);
			this.#search = new SearchView(
				searchPlaceType.page,
				() => null,
				(text: string) => {
					storage.storeSearchRequestText(text);
				},
				() => {
					dispatcher.notify(sendPageSearch());
				}
			);
		}

		// dispatcher.notify(newGetTagCardsResult());
	};

	checkIfPage = (metadata: Search): void => {
		console.log(metadata);
		if (metadata.type === searchPlaceType.page) {
			this.#cardView.rerenderCards();
		}
	};
}

export { SearchHolderView, SearchCardsHolderView };
