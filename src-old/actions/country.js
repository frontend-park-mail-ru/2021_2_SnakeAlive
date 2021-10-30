import { Event } from '../dispatcher/index.js';

const initCountryRequest = 'INIT_COUNTRY_REQUEST';

const newInitCountryRequest = (name, ID) =>
	new Event(initCountryRequest, {
		name,
		ID,
	});

const initCountryResponse = 'INIT_COUNTRY_RESPONSE';

const newInitCountryResponse = (name, ID) =>
	new Event(initCountryResponse, {
		name,
		ID,
	});

const getCountryCardRequest = 'GET_COUNTRY_CARDS_REQUEST';

const newGetCountryCardsRequest = countryID =>
	new Event(getCountryCardRequest, {
		ID: countryID,
	});

const getCountryCardsResult = 'GET_COUNTRY_CARDS_RESULT';

const newGetCountryCardsResult = () => new Event(getCountryCardsResult);

const getCountryCardsError = 'GET_COUNTRY_CARDS_ERROR';

const newGetCountryCardsError = error =>
	new Event(getCountryCardsError, {
		error,
	});

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
};
