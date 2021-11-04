import CountryReducer from './country';
import LoginReducer from './login';
import RegisterReducer from './register';

import { destroyCurrentPage, initCountryPageRequest } from '@/actions';
import { CountryCardsHolderView, CountryHolderView, LoginView, RegisterView } from '@/view';

import { DataType, dispatcher, ErrorMsgData, EventType } from '@/dispatcher';
import ErrorView from '@/view/error';

export default class PageReducer {
	constructor() {
		console.log("pageReducer constructed");
	}

	init = () => {
		dispatcher.register(EventType.INIT_COUNTRY_PAGE_REQUEST, this.createCountryPage);
		dispatcher.register(EventType.INIT_PAGE_REQUEST, this.createInitPage);
		dispatcher.register(EventType.INIT_LOGIN_PAGE_REQUEST, this.createLoginPage);
		dispatcher.register(EventType.INIT_REGISTER_PAGE_REQUEST, this.createRegisterPage);
		dispatcher.register(EventType.INIT_ERROR_PAGE_REQUEST, this.createErrorPage);
	};

	createInitPage = (): void => {
		// default country id = 0
		this.createCountryPage('0');
	};

	createCountryPage = (metadata: DataType): void => {
		dispatcher.notify(destroyCurrentPage());

		const countryReducer: CountryReducer = new CountryReducer();
		countryReducer.init();

		const countryHolderView: CountryHolderView = new CountryHolderView();
		countryHolderView.init();

		const countryCardsHolderView: CountryCardsHolderView = new CountryCardsHolderView();
		countryCardsHolderView.init();
	};

	createErrorPage = (metadata: ErrorMsgData):void => {
		dispatcher.notify(destroyCurrentPage());

		const errorView: ErrorView = new ErrorView();

		errorView.init(metadata.error);
	}

	createLoginPage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const loginReducer: LoginReducer = new LoginReducer();
		loginReducer.init();

		const loginView: LoginView = new LoginView();
		loginView.init();
	};

	createRegisterPage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const registerReducer: RegisterReducer = new RegisterReducer();
		registerReducer.init();

		const registerView: RegisterView = new RegisterView();
		registerView.init();
	};
}
