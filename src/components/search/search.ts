import searchTemplate from './search.handlebars';
import './search.scss';
import imgSearch from '../../../image/icon/search_16.svg';
import imgSearchWhite from '../../../image/icon/search_white.svg';

import { dispatcher, EventType } from '@/dispatcher';
import { storage } from '@/storage';
import { Search } from '@/dispatcher/metadata_types';
import { searchRequest } from '@/actions/search';
import { router } from '@/router';
import { pathsURLfrontend } from '@/constants';
import { searchPlaceType } from '@/models/search';
import { Sight } from '@/models';

export const initSearchView = (type: searchPlaceType, needsPageGoBtn: boolean, title = ''): string =>
	searchTemplate({ icon: imgSearch, type, needsPageGoBtn, iconWhite: imgSearchWhite, title });

export class SearchView {
	#type: searchPlaceType;

	#callback: (id: string, sight?: Sight, day?: number) => void;

	#inputCallback: (str: string) => void;

	#goSearchCallback: () => void;

	#enterCallback: (text: string, sight?: Sight, day?: number) => void;

	#searchList: HTMLElement | null = null;

	#value = '';

	#needCleaning = true;

	constructor(
		type: searchPlaceType,
		callback: (id: string, sight?: Sight, day?: number) => void, // нажатие на элемент выпадающего списка
		inputCallback: (text: string) => void = (text: string) => { // ввод текста
			dispatcher.notify(searchRequest(text, this.#type));
		},
		goSearchCallback: () => void // нажатие на кнопку на экране
			= () => {
			router.go(pathsURLfrontend.search, this.#value);
		},
		enterCallback?: (text?: string, sight?: Sight, day?: number) => void
	) {
		this.#type = type;

		this.#callback = callback;

		this.#inputCallback = inputCallback;

		this.#goSearchCallback = goSearchCallback;

		if (enterCallback) {
			this.#enterCallback = enterCallback;
		} else {
			this.#enterCallback = this.#callback;
		}

		const searchList = document.getElementById(`search_list_${type}`);
		if (searchList !== null) {
			this.#searchList = searchList;
		}

		const goPageBtn = document.getElementById(`go_search_page_${type}`);
		if (goPageBtn !== null) {
			goPageBtn.addEventListener('click', event => {
				event.preventDefault();
				this.#goSearchCallback();
			}, false);
		}

		const input = <HTMLInputElement>document.getElementById(`search_${type}`);

		if (input !== null) {
			input.addEventListener('keydown', e => {
				if (e.key === 'Enter') {
					e.preventDefault();

					const { value } = input;
					this.#value = value;
					if (storage.getSearchSightsResult(this.#type).length > 0) {
						this.#enterCallback(storage.getSearchSightsResult(this.#type)[0].id, storage.getSearchSightsResult(this.#type)[0], 42);
					} else {
						this.#enterCallback(this.#value);
					}

					this.#clearSearch(input);
				}
			});

			input.addEventListener(
				'input',
				(event) => {
					event.preventDefault();

					const { value } = input;
					this.#value = value;
					this.#inputCallback(this.#value);

					if (this.#searchList !== null) {
						const values = <HTMLOptionElement[]>(<unknown>this.#searchList.childNodes);
						values.forEach(option => {
							if (value === option.value) {
								// eslint-disable-next-line eqeqeq
								this.#callback(option.id, storage.getSearchSightsResult(this.#type).filter(sight => sight.id == option.id)[0], 42);
								this.#clearSearch(input);
							}
						});
					}


				},
				false
			);
		}

		dispatcher.register(EventType.GOT_SEARCH_RESULTS, this.showResults);
	}

	showResults = (typeSearch: Search) => {
		if (this.#type === typeSearch.type) {
			const result = storage.getSearchSightsResult(this.#type);
			if (this.#searchList !== null) {
				this.#searchList.innerHTML = '';
			}
			result.forEach(sight => {
				// создание элемента в список и добавление его
				const elem = <HTMLOptionElement>document.createElement('option');
				elem.value = sight.name;
				elem.id = sight.id;
				if (this.#searchList !== null) {
					this.#searchList.appendChild(elem);
				}
			});
		}
	};

	stopCleaning = () => {
		this.#needCleaning = false;
	}

	#clearSearch = (input: HTMLInputElement) => {
		if (this.#needCleaning) {
			// eslint-disable-next-line no-param-reassign
			input.value = '';
			this.#value = '';
			if (this.#searchList) {
				this.#searchList.innerHTML = '';
			}
		}
	}
}
