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
import { AdoptedTag } from '@/models/tags';
import { SearchCountry } from '@/models/country';

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
						id: tag.ID.toString(),
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

const changeIncludeState = (single: string, list: string[]): string[] => {
	let newList: string[] = [];
	if (!list) {
		newList.push(single);
		return newList;
	}

	if (list.indexOf(single) !== -1) { // значит уже есть в списке
		newList = list.filter(elem => elem !== single);
	} else {
		newList = list;
		newList.push(single);
	}
	return newList;
}

const listToString = (list: number[]): string[] => {
	const resList: string[] = [];
	if (! list){
		return resList;
	}
	list.forEach(item => {
		resList.push(item.toString());
	});
	return resList;
}

const listToNumbers = (list: string[]): number[] => {
	const resList: number[] = [];
	if (! list){
		return resList;
	}
	list.forEach(item => {
		resList.push(Number(item));
	});
	return resList;
}

const initCategories = (list: AdoptedTag[] | SearchCountry[], moreList: AdoptedTag[] | SearchCountry[]) => {

	if ( ! list ) {
		return;
	}

	interface Info {
		type: "tag" | "country";
		callback: (any) => void
	}
	// @ts-ignore
	const info: Info = {};
	// @ts-ignore
	if (list[0].translation) {
		// это страны
		info.type = "country";
		info.callback = (name: string) => {
			storage.storeSearchRequestCountries(changeIncludeState(name, storage.getSearchRequest().countries));
			dispatcher.notify(sendPageSearch());
		}
	} else {
		info.type = "tag";
		info.callback = (name: string) => {
			storage.storeSearchRequestTags(listToNumbers(changeIncludeState(name, listToString(storage.getSearchRequest().tags))));
			dispatcher.notify(sendPageSearch());
		}
	}

	const activeCSSClass = 'page_category_active';
	list.forEach(tag => {
		const tegElem = document.getElementById(`${info.type}_${tag.ID}`);
		if (tegElem !== null) {
			tegElem.addEventListener('click', () => {
				if (tegElem.classList.contains(activeCSSClass)) {
					tegElem.classList.remove(activeCSSClass);
				} else {
					tegElem.classList.add(activeCSSClass);
				}
				info.callback(tag.ID);
			});
		}
	});
	moreList.forEach(tag => {
		const tegElem = document.getElementById(`dropdown_${info.type}_${tag.ID}`);
		if (tegElem !== null) {
			tegElem.addEventListener('click', () => {
				if (tegElem.classList.contains(activeCSSClass)) {
					tegElem.classList.remove(activeCSSClass);
				} else {
					tegElem.classList.add(activeCSSClass);
				}
				info.callback(tag.ID);
			});
		}
	});
	initDropdown();
};

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
		const renderObj = {
			tags: storage.getSearchTags().slice(0, 6),
			allTags: storage.getSearchTags().slice(6),
			countries: storage.getSearchCountries().slice(0, 6),
			allCountries: storage.getSearchCountries().slice(6, 0),
		};

		this.setView(
			searchPageTemplate(renderObj)
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
					if (text) {
						storage.storeSearchRequestText(text);
					} else {
						storage.storeSearchRequestText("");
					}
					dispatcher.notify(sendPageSearch());
				},
				() => {
					dispatcher.notify(sendPageSearch());
				},
				(text) => {
					if (text) {
						storage.storeSearchRequestText(text);
					} else {
						storage.storeSearchRequestText("");
					}
					dispatcher.notify(sendPageSearch());
				}
			);
		}

		initCategories(renderObj.tags, renderObj.allTags);
		initCategories(renderObj.countries, renderObj.allCountries);

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
