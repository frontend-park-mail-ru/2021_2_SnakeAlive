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
    newGetProfileRequest, newGetProfileResponse, newUpdateProfileMetadataRequest, newUpdateProfilePhotoRequest
} from './profile'

import {
    newInitPageRequest,
    initLoginPageRequest,
    initRegisterPageRequest,
    destroyCurrentPage,
    initSightPageRequest,
    initTripPageRequest,
    initErrorPageRequest,
    initCountryPageRequest,
	initProfilePageRequest,
} from './page';

import {
	newSetMainHeaderRequest,
	newSetMainHeaderLoggedResponse,
	newSetMainHeaderBasicResponse,
	newRemoveHeaderRequest,
	newSetEmptyHeaderRequest,
	newSetEmptyHeaderResponse,
	newSetMainHeaderStrongRequest
} from './header';

import {
    submitLoginData,
    setValidationErrorLogin,
    submitRegisterData,
    setValidationErrorRegister,
} from './auth';

import { newGetSightRequest, newGetSightResult } from './sight';
import { newGetTripRequest, newGetTripResult } from './trip';
import {
	newGetReviewsRequest,
	newGetReviewsResponse,
	newDeleteReviewRequest,
	newCreateReviewRequest,
	newCreateReviewResponse,
} from './review'
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
	newGetSightRequest,
	newGetSightResult,
	newGetTripRequest,
	newGetTripResult,

	newGetProfileRequest,
	newGetProfileResponse,
	newUpdateProfileMetadataRequest,
	newUpdateProfilePhotoRequest,
	initProfilePageRequest,

	newGetReviewsRequest,
	newGetReviewsResponse,
	newDeleteReviewRequest,
	newCreateReviewRequest,
	newCreateReviewResponse,
};
