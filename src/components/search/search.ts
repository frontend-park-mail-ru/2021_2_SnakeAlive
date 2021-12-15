import searchTemplate from './search.handlebars';
import './search.scss';
import imgSearch from '../../../image/icon/search_16.svg';
import imgSearchWhite from '../../../image/icon/search_white.svg';

import { dispatcher, EventType } from '@/dispatcher';
import { storage } from '@/storage';
import { Search } from '@/dispatcher/metadata_types';
import { searchRequest } from '@/actions/search';
import { throttle } from 'throttle-typescript';
import { router } from '@/router';
import { pathsURLfrontend } from '@/constants';
import { searchPlaceType } from '@/models/search';

export const initSearchView = (type: searchPlaceType, needsPageGoBtn: boolean): string =>
	searchTemplate({ icon: imgSearch, type, needsPageGoBtn, iconWhite: imgSearchWhite });

export class SearchView {
	#type: searchPlaceType;

	#callback: (id: string) => void;

	#inputCallback: (str: string) => void;

	#goSearchCallback: () => void;

	#searchList: HTMLElement | null = null;

	#value = '';

	constructor(
		type: searchPlaceType,
		callback: (id: string) => void,
		inputCallback: (text: string) => void = (text: string) => {
			dispatcher.notify(searchRequest(text, this.#type));
		},
		goSearchCallback: () => void
			// = () => {
		// 	router.go(pathsURLfrontend.search, this.#value);
		// }
	) {
		this.#type = type;

		this.#callback = callback;

		this.#inputCallback = inputCallback;

		this.#goSearchCallback = goSearchCallback;

		const searchList = document.getElementById(`search_list_${type}`);
		if (searchList !== null) {
			this.#searchList = searchList;
		}

		const goPageBtn = document.getElementById(`go_search_page_${type}`);
		if (goPageBtn !== null) {
			goPageBtn.addEventListener('click', event => {
				console.log(goPageBtn.id, "clicked");
				event.preventDefault();
				this.#goSearchCallback();
			}, false);
		}

		const input = <HTMLInputElement>document.getElementById(`search_${type}`);

		if (input !== null) {
			input.addEventListener('keydown', e => {
				if (e.key === 'Enter') {
					goSearchCallback();
					e.preventDefault();
				}
			});

			input.addEventListener(
				'input',
				(event) => {
					event.preventDefault();
					inputCallback(input.value);
				},
				false
			);

			input.addEventListener(
				'input',
				() => {
					const { value } = input;
					this.#value = value;
					if (this.#searchList !== null) {
						const values = <HTMLOptionElement[]>(<unknown>this.#searchList.childNodes);
						values.forEach(option => {
							if (value === option.value) {
								console.log(this.#callback, "inited");
								this.#callback(option.id);
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
}
