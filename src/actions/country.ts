import { Event, NamedID, ID, Empty, ErrorMessage } from '../dispatcher';

const initCountryRequest = 'INIT_COUNTRY_REQUEST';

const newInitCountryRequest = (name: string, id: string): Event =>
	<Event>{
		key: initCountryRequest,
		metadata: <NamedID>{
			name,
			ID: id,
		},
	};

const initCountryResponse = 'INIT_COUNTRY_RESPONSE';

const newInitCountryResponse = (name: string, id: string): Event =>
	<Event>{
		key: initCountryResponse,
		metadata: <NamedID>{},
	};

const getCountryCardRequest = 'GET_COUNTRY_CARDS_REQUEST';

const newGetCountryCardsRequest = (countryID: string): Event =>
	<Event>{
		key: getCountryCardRequest,
		metadata: <ID>{
			ID: countryID,
		},
	};

const getCountryCardsResult = 'GET_COUNTRY_CARDS_RESULT';

const newGetCountryCardsResult = (): Event =>
	<Event>{
		key: getCountryCardsResult,
		metadata: <Empty>{},
	};

const getCountryCardsError = 'GET_COUNTRY_CARDS_ERROR';

const newGetCountryCardsError = (error: Error): Event =>
	<Event>{
		key: getCountryCardsError,
		metadata: <ErrorMessage>{
			error,
		},
	};

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
