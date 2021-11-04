import {
	newGetCountryCardsRequest,
	newGetCountryCardsResult,
	newGetCountryCardsError,
	// newInitCountryRequest,
	// newInitCountryResponse,
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
	newSetEmptyHeaderResponse,
} from './header';

import {
	submitLoginData,
	setValidationErrorLogin,
	submitRegisterData,
	setValidationErrorRegister,
} from './auth';

import { newGetSightRequest, newGetSightResult } from './sight';
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
	// newInitCountryRequest,
	// newInitCountryResponse,
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
	initLoginPageRequest,
	initRegisterPageRequest,
	submitLoginData,
	setValidationErrorLogin,
	submitRegisterData,
	setValidationErrorRegister,
	destroyCurrentPage,
	newSetEmptyHeaderResponse,
	initSightPageRequest,
	initTripPageRequest,
	initCountryPageRequest,
	initErrorPageRequest,
	newGetSightRequest,
	newGetSightResult,
	newGetTripRequest,
	newGetTripResult,
};
