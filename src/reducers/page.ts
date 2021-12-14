import CountryReducer from './country';
import LoginReducer from './login';
import RegisterReducer from './register';

import { destroyCurrentPage } from '@/actions/page';
import { CountryCardsHolderView, CountryHolderView, LoginView, RegisterView } from '@/view';

import { dispatcher, ErrorMsgData, EventType, NumID } from '@/dispatcher';
import ErrorView from '@/view/error';
import SightReducer from '@/reducers/sight';
import SightView from '@/view/sight';
import TripReducer from '@/reducers/trip';
import { InitTripPage } from '@/view/trip';
import ProfileReducer from '@/reducers/profile';
import ProfileView from '@/view/profile';
import ReviewReducer from '@/reducers/review';
import { ReviewCreateView, ReviewsView } from '@/view/review';
import AlbumReducer from '@/reducers/album';
import { AlbumView } from '@/view/album';
import TagReducer from '@/reducers/tag';
import { TagCardsHolderView, TagHolderView } from '@/view/tag';
import AlienProfileReducer from '@/reducers/alien_profile';
import AlienProfileView from '@/view/alien_profile';
import SearchPageReducer from '@/reducers/search_page';
import { SearchHolderView } from '@/view/search_page';

export default class PageReducer {
	// constructor() {
	// 	//
	// }

	init = () => {
		dispatcher.register(EventType.INIT_COUNTRY_PAGE_REQUEST, this.createCountryPage);
		dispatcher.register(EventType.INIT_SIGHT_PAGE_REQUEST, this.createSightPage);
		dispatcher.register(EventType.INIT_TRIP_PAGE_REQUEST, this.createTripPage);
		dispatcher.register(EventType.INIT_TRIP_EDIT_PAGE_REQUEST, this.createTripEditPage);
		dispatcher.register(EventType.INIT_ALBUM_PAGE_REQUEST, this.createAlbumPage);
		dispatcher.register(EventType.INIT_PAGE_REQUEST, this.createInitPage);
		dispatcher.register(EventType.INIT_LOGIN_PAGE_REQUEST, this.createLoginPage);
		dispatcher.register(EventType.INIT_REGISTER_PAGE_REQUEST, this.createRegisterPage);
		dispatcher.register(EventType.INIT_ERROR_PAGE_REQUEST, this.createErrorPage);
		dispatcher.register(EventType.INIT_PROFILE_PAGE_REQUEST, this.createProfilePage);

		dispatcher.register(EventType.INIT_TAG_PAGE_REQUEST, this.createTagPage);
		dispatcher.register(EventType.INIT_ALIEN_PROFILE_PAGE_REQUEST, this.createAlienProfilePage);
		dispatcher.register(EventType.INIT_SEARCH_PAGE_REQUEST, this.createSearchPage);
	};

	createInitPage = (): void => {
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

	createSightPage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const sightReducer: SightReducer = new SightReducer();
		sightReducer.init();

		const sightView: SightView = new SightView();
		sightView.init();

		const reviewReducer: ReviewReducer = new ReviewReducer();
		reviewReducer.init();

		const reviewsView: ReviewsView = new ReviewsView();
		const reviewCreateView: ReviewCreateView = new ReviewCreateView();
		reviewsView.init();
		reviewCreateView.init();
	};

	createTripPage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const tripReducer: TripReducer = new TripReducer();
		tripReducer.init();

		const tripPage: InitTripPage = new InitTripPage();
		tripPage.init();
	};

	createTripEditPage = (metadata: NumID): void => {
		dispatcher.notify(destroyCurrentPage());

		const tripReducer: TripReducer = new TripReducer();
		tripReducer.init();

		const tripPage: InitTripPage = new InitTripPage();
		tripPage.init();
		tripPage.initEdit(metadata);
	};

	createAlbumPage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const albumReducer: AlbumReducer = new AlbumReducer();
		albumReducer.init();

		const albumView: AlbumView = new AlbumView();
		albumView.init();
	};

	createProfilePage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const profileReducer: ProfileReducer = new ProfileReducer();
		profileReducer.init();

		const profileView: ProfileView = new ProfileView();
		profileView.init();
	};

	createTagPage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const tagReducer: TagReducer = new TagReducer();
		tagReducer.init();

		const tagHolderView: TagHolderView = new TagHolderView();
		tagHolderView.init();

		const tagCardsHolderView: TagCardsHolderView = new TagCardsHolderView();
		tagCardsHolderView.init();
	};

	createAlienProfilePage = (): void => {
		dispatcher.notify(destroyCurrentPage());

		const alienProfileReducer: AlienProfileReducer = new AlienProfileReducer();
		alienProfileReducer.init();

		const alienProfileView: AlienProfileView = new AlienProfileView();
		alienProfileView.init();
	};

	createSearchPage = () => {
		dispatcher.notify(destroyCurrentPage());

		const searchPageReducer: SearchPageReducer = new SearchPageReducer();
		searchPageReducer.init();

		const searchHolderView: SearchHolderView = new SearchHolderView();
		searchHolderView.init();
	}
}
