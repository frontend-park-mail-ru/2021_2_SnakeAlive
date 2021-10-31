import { Event, NamedID, ID, Empty, ErrorMessage } from '../dispatcher/index';

const removeHeaderRequest = 'REMOVE_HEADER_REQUEST';

const newRemoveHeaderRequest = (): Event =>
	<Event>{
		key: removeHeaderRequest,
		metadata: <Empty>{},
	};

const setMainHeaderRequest = 'SET_MAIN_HEADER_REQUEST';

const newSetMainHeaderRequest = (): Event =>
	<Event>{
		key: setMainHeaderRequest,
		metadata: <Empty>{},
	};

const setMainHeaderLoggedResponse = 'SET_MAIN_HEADER_LOGGED_RESPONSE';

const newSetMainHeaderLoggedResponse = (): Event =>
	<Event>{
		key: setMainHeaderLoggedResponse,
		metadata: <Empty>{},
	};

const setMainHeaderBasicResponse = 'SET_MAIN_HEADER_BASIC_RESPONSE';

const newSetMainHeaderBasicResponse = (): Event =>
	<Event>{
		key: setMainHeaderBasicResponse,
		metadata: <Empty>{},
	};

const SET_EMPTY_HEADER_RESPONSE = 'SET_MAIN_HEADER_EMPTY_RESPONSE';

const newSetEmptyHeaderResponse = (): Event =>
	<Event>{
		key: SET_EMPTY_HEADER_RESPONSE,
		metadata: <Empty>{},
	};

export {
	setMainHeaderRequest,
	setMainHeaderBasicResponse,
	setMainHeaderLoggedResponse,
	removeHeaderRequest,
	newSetMainHeaderRequest,
	newSetMainHeaderLoggedResponse,
	newSetMainHeaderBasicResponse,
	newRemoveHeaderRequest,
	SET_EMPTY_HEADER_RESPONSE,
	newSetEmptyHeaderResponse,
};
