import CountryReducer from './country';
import LoginReducer from './login';
import RegisterReducer from './register';

import { destroyCurrentPage, initCountryPageRequest } from '@/actions';
import { CountryCardsHolderView, CountryHolderView, LoginView, RegisterView } from '@/view';

import { DataType, dispatcher, ErrorMsgData, EventType, IdData } from '@/dispatcher';
import ErrorView from '@/view/error';
import SightReducer from '@/reducers/sight';
import SightView from '@/view/sight';
import TripReducer from '@/reducers/trip';
import TripView from '@/view/trip';

export default class PageReducer {
	constructor() {
		console.log('pageReducer constructed');
	}

	init = () => {
		dispatcher.register(EventType.INIT_COUNTRY_PAGE_REQUEST, this.createCountryPage);
		dispatcher.register(EventType.INIT_SIGHT_PAGE_REQUEST, this.createSightPage);
		dispatcher.register(EventType.INIT_TRIP_PAGE_REQUEST, this.createTripPage);
		dispatcher.register(EventType.INIT_PAGE_REQUEST, this.createInitPage);
		dispatcher.register(EventType.INIT_LOGIN_PAGE_REQUEST, this.createLoginPage);
		dispatcher.register(EventType.INIT_REGISTER_PAGE_REQUEST, this.createRegisterPage);
		dispatcher.register(EventType.INIT_ERROR_PAGE_REQUEST, this.createErrorPage);
	};

	createInitPage = (): void => {
		// default country id = 0
		this.createCountryPage();
	};

	createCountryPage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const countryReducer: CountryReducer = new CountryReducer();
		countryReducer.init();

		const countryHolderView: CountryHolderView = new CountryHolderView();
		countryHolderView.init();

		const countryCardsHolderView: CountryCardsHolderView = new CountryCardsHolderView();
		countryCardsHolderView.init();
	};

	createErrorPage = (metadata: ErrorMsgData): void => {
		dispatcher.notify(destroyCurrentPage());

		const errorView: ErrorView = new ErrorView();

		errorView.init(metadata.error);
	};

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

	createSightPage = (metadata: IdData): void => {
		dispatcher.notify(destroyCurrentPage());

		const sightReducer: SightReducer = new SightReducer();
		sightReducer.init(metadata.ID);

		const sightView: SightView = new SightView();
		sightView.init();
	};

	createTripPage = (metadata: IdData):void => {
		dispatcher.notify(destroyCurrentPage());

		const tripReducer: TripReducer = new TripReducer();
		tripReducer.init(metadata.ID);

		const tripView: TripView = new TripView();
		tripView.init();
	};
}
