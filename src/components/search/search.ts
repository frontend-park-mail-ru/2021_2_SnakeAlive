import searchTemplate from './search.handlebars';

import imgSearch from '../../../image/icon/search_16.svg';
import './search.scss';
import { dispatcher, EventType } from '@/dispatcher';
import { storage } from '@/storage';
import { Search } from '@/dispatcher/metadata_types';
import { searchRequest } from '@/actions/search';

export const initSearchView = (type: string): string => searchTemplate({ icon: imgSearch, type });

export class SearchView {
	#type = '';

	#callback: (id: string) => void;

	#searchList: HTMLElement | null = null;

	constructor(type: string, callback: (id: string) => void) {
		this.#type = type;

		this.#callback = callback;

		const searchList = document.getElementById(`search_list_${type}`);
		if (searchList !== null) {
			this.#searchList = searchList;
		}

		const input = <HTMLInputElement>document.getElementById(`search_${type}`);
		if (input !== null) {
			input.addEventListener(
				'input',
				() => {
					dispatcher.notify(searchRequest(input.value, this.#type));
				}, false);

			input.addEventListener(
				'input',
				() => {
					const { value } = input;
					if (this.#searchList !== null) {
						const values = <HTMLOptionElement[]><unknown>this.#searchList.childNodes;
						values.forEach((option) => {
							if (value === option.value) {
								this.#callback(option.id);
							}
						})
					}
				}, false);
		}

		dispatcher.register(EventType.GOT_SEARCH_RESULTS, this.showResults)
	}

	showResults = (typeSearch: Search) => {
		if (this.#type === typeSearch.type) {
			const result = storage.getSearchSightsResult(this.#type);
			if (this.#searchList !== null) {
				this.#searchList.innerHTML = '';
			}
			result.forEach((sight) => {
				// создание элемента в список и добавление его
				const elem = <HTMLOptionElement>document.createElement('option')
				elem.value = sight.name;
				elem.id = sight.id;
				if (this.#searchList !== null) {
					this.#searchList.appendChild(elem);
				}
			})
		}
	}
}