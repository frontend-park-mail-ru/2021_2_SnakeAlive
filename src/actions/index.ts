import {
	getCountryCardRequest,
	getCountryCardsResult,
	getCountryCardsError,
	initCountryRequest,
	initCountryResponse,
	newGetCountryCardsRequest,
	newGetCountryCardsResult,
	newGetCountryCardsError,
	newInitCountryRequest,
	newInitCountryResponse,
} from './country';

import {
	destroyInnerRequest,
	destroyCountryPage,
	newDestroyInnerRequest,
	newDestroyCountryPage,
} from './view';

import {
	initPageRequest,
	newInitPageRequest,
	INIT_LOGIN_PAGE_REQUEST,
	INIT_REGISTER_PAGE_REQUEST,
	initLoginPageRequest,
	initRegisterPageRequest,
	DESTROY_CURRENT_PAGE,
	destroyCurrentPage,
} from './page';

import {
	setMainHeaderRequest,
	setMainHeaderBasicResponse,
	setMainHeaderLoggedResponse,
	removeHeaderRequest,
	newSetMainHeaderRequest,
	newSetMainHeaderLoggedResponse,
	newSetMainHeaderBasicResponse,
	newRemoveHeaderRequest,
} from './header';

import {
	SUBMIT_LOGIN_DATA,
	submitLoginData,
	SET_VALIDATION_ERROR_LOGIN,
	setValidationErrorLogin
} from './auth';

export {
	getCountryCardRequest,
	getCountryCardsResult,
	getCountryCardsError,
	initCountryRequest,
	initCountryResponse,
	newGetCountryCardsRequest,
	newGetCountryCardsResult,
	newGetCountryCardsError,
	newInitCountryRequest,
	newInitCountryResponse,
	destroyInnerRequest,
	destroyCountryPage,
	newDestroyInnerRequest,
	newDestroyCountryPage,
	initPageRequest,
	newInitPageRequest,
	setMainHeaderRequest,
	setMainHeaderBasicResponse,
	setMainHeaderLoggedResponse,
	removeHeaderRequest,
	newSetMainHeaderRequest,
	newSetMainHeaderLoggedResponse,
	newSetMainHeaderBasicResponse,
	newRemoveHeaderRequest,

	INIT_LOGIN_PAGE_REQUEST,
	INIT_REGISTER_PAGE_REQUEST,
	initLoginPageRequest,
	initRegisterPageRequest,

	SUBMIT_LOGIN_DATA,
	submitLoginData,
	SET_VALIDATION_ERROR_LOGIN,
	setValidationErrorLogin,

	DESTROY_CURRENT_PAGE,
	destroyCurrentPage,
};
