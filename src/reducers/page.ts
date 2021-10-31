import CountryReducer from './country';
import LoginReducer from './login';
import RegisterReducer from './register';

import {
	initPageRequest,
	INIT_LOGIN_PAGE_REQUEST,
	INIT_REGISTER_PAGE_REQUEST,
	destroyCurrentPage,
} from '@/actions';
import { CountryCardsHolderView, CountryHolderView, LoginView, RegisterView } from '@/view';

import { dispatcher } from '@/dispatcher';

export default class PageReducer {
	#viewPlace: HTMLDivElement;

	constructor(place: HTMLDivElement) {
		this.#viewPlace = place;
	}

	init = () => {
		dispatcher.register(initPageRequest, this.createInitPage);
		dispatcher.register(INIT_LOGIN_PAGE_REQUEST, this.createLoginPage);
		dispatcher.register(INIT_REGISTER_PAGE_REQUEST, this.createRegisterPage);
	};

	createInitPage = (): void => {
		console.log('create init page');
		dispatcher.notify(destroyCurrentPage());

		const countryReducer: CountryReducer = new CountryReducer();
		countryReducer.init();

		const countryHolderView: CountryHolderView = new CountryHolderView(this.#viewPlace);
		countryHolderView.init();

		const countryCardsHolderView: CountryCardsHolderView = new CountryCardsHolderView();
		countryCardsHolderView.init();
	};

	createLoginPage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const loginReducer: LoginReducer = new LoginReducer();
		loginReducer.init();

		const loginView: LoginView = new LoginView(this.#viewPlace);
		loginView.init();
	};

	createRegisterPage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const registerReducer: RegisterReducer = new RegisterReducer();
		registerReducer.init();

		const registerView: RegisterView = new RegisterView(this.#viewPlace);
		registerView.init();
	};
}
