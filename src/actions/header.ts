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

export {
	setMainHeaderRequest,
	setMainHeaderBasicResponse,
	setMainHeaderLoggedResponse,
	removeHeaderRequest,
	newSetMainHeaderRequest,
	newSetMainHeaderLoggedResponse,
	newSetMainHeaderBasicResponse,
	newRemoveHeaderRequest,
};
