import BasicView from './view';
import { storage } from '@/storage';
import { dispatcher, EventType, Token } from '@/dispatcher';

import { makeSimpleButton } from '@/components';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';

import { makeHeader } from '@/components/header/header';
import { Profile } from '@/models/profile';
import { IsTrue } from '@/dispatcher/metadata_types';
import { initSearchView, SearchView } from '@/components/search/search';
import { router } from '@/router';
import { createFrontendQueryParams } from '@/router/router';
import { searchPlaceType } from '@/models/search';
import { newSetMainHeaderStrongRequest } from '@/actions/header';

const initHeaderSearch = (): SearchView | null => {
	// поиск
	const searchPlace = document.getElementById('header-search-place');
	if (searchPlace !== null) {
		searchPlace.innerHTML = initSearchView(searchPlaceType.header, true, "на страницу поиска");
		return new SearchView(searchPlaceType.header, (id: string) => {
			router.go(
				createFrontendQueryParams(pathsURLfrontend.sight, [
					{
						key: paramsURLfrontend.id,
						value: id,
					},
				])
			);
			dispatcher.notify(newSetMainHeaderStrongRequest());
		});
	}
	return null;
}

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

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
		this.setEmpty();
	};

	setMainHeaderLogged = (): void => {
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

		this.#search = initHeaderSearch();
	};

	setMainHeaderBasic = (): void => {
		const dataTemplate = {
			isNotEmpty: true,
			isUser: false,
			btnText: 'Войти',
		};
		this.setView(makeHeader(dataTemplate));

		makeSimpleButton('logo-h', pathsURLfrontend.root);
		makeSimpleButton('user-block', pathsURLfrontend.login);

		this.#search = initHeaderSearch();
	};

	setMainHeaderEmpty = (metadata: IsTrue): void => {
		const dataTemplate = {
			isNotEmpty: false,
			isUser: metadata.isTrue,
		};
		this.setView(makeHeader(dataTemplate));

		makeSimpleButton('logo-h', pathsURLfrontend.root);
		makeSimpleButton('trip-block', pathsURLfrontend.trip);
	};
}
