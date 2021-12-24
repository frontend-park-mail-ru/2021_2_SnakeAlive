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
import { minCardInfo, SearchCountry } from '@/models/country';

class SearchCardsHolderView extends BasicView {
	// #cards: Array<SightCardInTrip>;
	#isFirstTime = true;

	constructor() {
		super('#card-grid-wrapper');

		// this.#cards = [];
	}

	destroy = (): void => {
		this.setEmpty();
	};

	rerenderCards = (cardsArray: minCardInfo[]) => {
		this.setEmpty();

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
		if (this.#isFirstTime) {
			this.#isFirstTime = false;
			this.setView(tripSights({ cards: cardsArray }));
		} else {
			this.setView(
				tripSights({ cards: cardsArray, replaceText: 'По такому запросу ничего не найдено' })
			);
		}

		cardsArray.forEach(sight => {
			const card = new SightCardInTrip();
			card.createCard(sight.sight.id, sight.PP, sight.sight.adoptedTags);
		});
	};
}

const changeIncludeState = (single: string, list: string[]): string[] => {
	let newList: string[] = [];
	if (!list) {
		newList.push(single);
		return newList;
	}

	if (list.indexOf(single) !== -1) {
		// значит уже есть в списке
		newList = list.filter(elem => elem !== single);
	} else {
		newList = list;
		newList.push(single);
	}
	return newList;
};

const listToString = (list: number[]): string[] => {
	const resList: string[] = [];
	if (!list) {
		return resList;
	}
	list.forEach(item => {
		resList.push(item.toString());
	});
	return resList;
};

const listToNumbers = (list: string[]): number[] => {
	const resList: number[] = [];
	if (!list) {
		return resList;
	}
	list.forEach(item => {
		resList.push(Number(item));
	});
	return resList;
};

const initReviewSearchParams = (): void => {
	// рейтинг
	for (let i = 1; i <= 5; i += 1) {
		const star = document.getElementById(`star-${i}`);
		console.log(star);
		if (star !== null) {
			star.addEventListener('click', () => {
				storage.storeSearchRequestMinRating(i);
				dispatcher.notify(sendPageSearch());
			});
		}
	}

	// количество отзывов
	const reviewAmount = <HTMLInputElement>document.getElementById('review-amount-input');
	if (reviewAmount !== null) {
		reviewAmount.addEventListener('change', () => {
			storage.storeSearchRequestMinReviewAmount(Number(reviewAmount.value));
			dispatcher.notify(sendPageSearch());
		});
	}
};

const initCategories = (
	list: AdoptedTag[] | SearchCountry[],
	moreList: AdoptedTag[] | SearchCountry[]
) => {
	if (!list) {
		return;
	}

	interface Info {
		type: 'tag' | 'country';
		callback: (any) => void;
	}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const info: Info = {};
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (list[0].translation) {
		// это страны
		info.type = 'country';
		info.callback = (name: string) => {
			storage.storeSearchRequestCountries(
				changeIncludeState(name, storage.getSearchRequest().countries)
			);
			dispatcher.notify(sendPageSearch());
		};
	} else {
		info.type = 'tag';
		info.callback = (name: string) => {
			storage.storeSearchRequestTags(
				listToNumbers(changeIncludeState(name, listToString(storage.getSearchRequest().tags)))
			);
			dispatcher.notify(sendPageSearch());
		};
	}

	const activeCSSClass = 'usual_button_dark';
	// const passiveCSSClass = 'usual_button_dark';
	list.forEach(tag => {
		const tegElem = document.getElementById(`${info.type}_${tag.id}`);
		if (tegElem !== null) {
			tegElem.addEventListener('click', () => {
				if (tegElem.classList.contains(activeCSSClass)) {
					tegElem.classList.remove(activeCSSClass);
				} else {
					tegElem.classList.add(activeCSSClass);
				}
				info.callback(tag.id);
			});
		}
	});
	moreList.forEach(tag => {
		const tegElem = document.getElementById(`dropdown_${info.type}_${tag.id}`);
		if (tegElem !== null) {
			tegElem.addEventListener('click', () => {
				if (tegElem.classList.contains(activeCSSClass)) {
					tegElem.classList.remove(activeCSSClass);
				} else {
					tegElem.classList.add(activeCSSClass);
				}
				info.callback(tag.id);
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
			tags: storage.getSearchTags(),
			allTags: [],
			// tags: storage.getSearchTags().slice(0, 6),
			// allTags: storage.getSearchTags().slice(6),
			countries: storage.getSearchCountries(),
			allCountries: [],
			// countries: storage.getSearchCountries().slice(0, 6),
			// allCountries: storage.getSearchCountries().slice(6, 0),
		};

		this.setView(searchPageTemplate(renderObj));
		initDropdown('dropdown_tags'); // ??
		initDropdown('dropdown_countries'); // ??

		this.#cardView.rerenderCards([]);

		// поиск
		const searchPlace = document.getElementById('page-search-place');
		if (searchPlace !== null) {
			searchPlace.innerHTML = initSearchView(searchPlaceType.page, false);
			this.#search = new SearchView(
				searchPlaceType.page,
				() => null,
				(text: string) => {
					if (text) {
						storage.storeSearchRequestText(text);
					} else {
						storage.storeSearchRequestText('');
					}
					dispatcher.notify(sendPageSearch());
				},
				() => {
					dispatcher.notify(sendPageSearch());
				},
				text => {
					if (text) {
						storage.storeSearchRequestText(text);
					} else {
						storage.storeSearchRequestText('');
					}
					dispatcher.notify(sendPageSearch());
				}
			);
			this.#search.stopCleaning();
		}

		initCategories(renderObj.tags, renderObj.allTags);
		initCategories(renderObj.countries, renderObj.allCountries);

		initReviewSearchParams();

		// dispatcher.notify(newGetTagCardsResult());
	};

	checkIfPage = (metadata: Search): void => {
		if (metadata.type === searchPlaceType.page) {
			this.#cardView.rerenderCards(storage.getSightsCardsMin());
		}
	};
}

export { SearchHolderView, SearchCardsHolderView };
