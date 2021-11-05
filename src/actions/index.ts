import {
	newGetCountryCardsRequest,
	newGetCountryCardsResult,
	newGetCountryCardsError,
	newInitCountryRequest,
	newInitCountryResponse,
} from './country';

// import {
// 	destroyInnerRequest,
// 	destroyCountryPage,
// 	newDestroyInnerRequest,
// 	newDestroyCountryPage,
// } from './view';

import {
	newInitPageRequest,
	initLoginPageRequest,
	initRegisterPageRequest,
	destroyCurrentPage,
	initSightPageRequest,
	initTripPageRequest,
	initErrorPageRequest,
	initCountryPageRequest,
} from './page';

import {
	newSetMainHeaderRequest,
	newSetMainHeaderLoggedResponse,
	newSetMainHeaderBasicResponse,
	newRemoveHeaderRequest,
	newSetEmptyHeaderRequest,
	newSetEmptyHeaderResponse,
	newSetMainHeaderStrongRequest,
} from './header';

import {
	submitLoginData,
	setValidationErrorLogin,
	submitRegisterData,
	setValidationErrorRegister,
	showRegisterForm,
	showLoginForm,
} from './auth';

import { newGetSightRequest, newGetSightResult, newGetSightReviewResult } from './sight';

import { newGetTripRequest, newGetTripResult } from './trip';

// рефактор need
export {
	// getCountryCardRequest,
	// getCountryCardsResult,
	// getCountryCardsError,
	// initCountryRequest,
	// initCountryResponse,
	newGetCountryCardsRequest,
	newGetCountryCardsResult,
	newGetCountryCardsError,
	newInitCountryRequest,
	newInitCountryResponse,
	// destroyInnerRequest,
	// destroyCountryPage,
	// newDestroyInnerRequest,
	// newDestroyCountryPage,
	// initPageRequest,
	newInitPageRequest,
	newSetMainHeaderRequest,
	newSetMainHeaderLoggedResponse,
	newSetMainHeaderBasicResponse,
	newRemoveHeaderRequest,
	newSetEmptyHeaderRequest,
	newSetEmptyHeaderResponse,
	newSetMainHeaderStrongRequest,
	initLoginPageRequest,
	initRegisterPageRequest,
	submitLoginData,
	setValidationErrorLogin,
	submitRegisterData,
	setValidationErrorRegister,
	destroyCurrentPage,
	initSightPageRequest,
	initTripPageRequest,
	initCountryPageRequest,
	initErrorPageRequest,
	// newGetSightRequest,
	// newGetSightResult,
	newGetSightRequest,
	newGetSightResult,
	newGetSightReviewResult,
	newGetTripRequest,
	newGetTripResult,
	showRegisterForm,
	showLoginForm,
};
