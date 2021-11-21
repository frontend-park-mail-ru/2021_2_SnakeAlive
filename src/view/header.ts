import BasicView from './view';
import { storage } from '@/storage';
import { DataType, dispatcher, EventType, Token } from '@/dispatcher';

import { makeSimpleButton } from '@/components';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';

import { makeHeader } from '@/components/header/header';
import { Profile } from '@/models/profile';
import { IsTrue } from '@/dispatcher/metadata_types';
import { initSearchView, SearchView } from '@/components/search/search';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';

export default class HeaderView extends BasicView {
	#tokens: Token[];

	#search: SearchView | null = null;

	constructor() {
		super('#header');
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.REMOVE_HEADER_REQUEST, this.destroy),
			dispatcher.register(EventType.SET_MAIN_HEADER_LOGGED_RESPONSE, this.setMainHeaderLogged),
			dispatcher.register(EventType.SET_MAIN_HEADER_BASIC_RESPONSE, this.setMainHeaderBasic),
			dispatcher.register(EventType.SET_MAIN_HEADER_EMPTY_RESPONSE, this.setMainHeaderEmpty),
		];
	};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	setMainHeaderLogged = (metadata: DataType): void => {
		const user: Profile = storage.getProfile();
		const dataTemplate = {
			isNotEmpty: true,
			isUser: true,
			name: user.meta.name,
			avatarPath: user.profileImage,
		};
		this.setView(makeHeader(dataTemplate));

		makeSimpleButton('logo-h', pathsURLfrontend.root);
		makeSimpleButton('user-block', pathsURLfrontend.profile);
		makeSimpleButton('trip-block', pathsURLfrontend.trip);

		// поиск
		const searchPlace = document.getElementById('header-search-place');
		if (searchPlace !== null) {
			searchPlace.innerHTML = initSearchView('header');
			this.#search = new SearchView('header', (id: string) => {
				router.go(
					createFrontendQueryParams(pathsURLfrontend.sight, [
						{
							key: paramsURLfrontend.id,
							value: id,
						},
					])
				);
			});
		}
	};

	setMainHeaderBasic = (metadata: DataType): void => {
		const dataTemplate = {
			isNotEmpty: true,
			isUser: false,
			btnText: 'Войти',
		};
		this.setView(makeHeader(dataTemplate));

		makeSimpleButton('logo-h', pathsURLfrontend.root);
		makeSimpleButton('user-block', pathsURLfrontend.login);

		// поиск
		const searchPlace = document.getElementById('header-search-place');
		if (searchPlace !== null) {
			searchPlace.innerHTML = initSearchView('header');
			this.#search = new SearchView('header', (id: string) => {
				router.go(
					createFrontendQueryParams(pathsURLfrontend.sight, [
						{
							key: paramsURLfrontend.id,
							value: id,
						},
					])
				);
			});
		}
	};

	setMainHeaderEmpty = (metadata: IsTrue): void => {
		const dataTemplate = {
			isNotEmpty: false,
			isUser: metadata.isTrue,
		};
		this.setView(makeHeader(dataTemplate));

		makeSimpleButton('logo-h', pathsURLfrontend.root);
		makeSimpleButton('trip-block', pathsURLfrontend.trip);

		// поиск
		// const searchPlace = document.getElementById('header-search-place');
		// if (searchPlace !== null) {
		// 	searchPlace.innerHTML = initSearchView("header");
		// 	this.#search = new SearchView("header", (id:string) => {
		// 		router.go(createFrontendQueryParams(pathsURLfrontend.sight, [
		// 			{
		// 				key: paramsURLfrontend.id,
		// 				value: id
		// 			}
		// 		]))
		// 	});
		// }
	};
}
