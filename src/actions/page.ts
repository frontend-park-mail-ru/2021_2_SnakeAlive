import { Empty, Event } from '../dispatcher';

const initPageRequest = 'INITIAL_PAGE_REQUEST';

const newInitPageRequest = (): Event =>
	<Event>{
		key: initPageRequest,
		metadata: <Empty>{},
	};

const INIT_REGISTER_PAGE_REQUEST = 'INIT_REGISTER_PAGE_REQUEST';

const initRegisterPageRequest = (): Event =>
	<Event>{
		key: INIT_REGISTER_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const INIT_LOGIN_PAGE_REQUEST = 'INIT_LOGIN_PAGE_REQUEST';

const initLoginPageRequest = (): Event =>
	<Event>{
		key: INIT_LOGIN_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const DESTROY_CURRENT_PAGE = 'DESTROY_CURRENT_PAGE';

const destroyCurrentPage = (): Event =>
	<Event>{
		key: DESTROY_CURRENT_PAGE,
		metadata: <Empty>{},
	};

export {
	initPageRequest,
	newInitPageRequest,
	INIT_LOGIN_PAGE_REQUEST,
	INIT_REGISTER_PAGE_REQUEST,
	initLoginPageRequest,
	initRegisterPageRequest,
	DESTROY_CURRENT_PAGE,
	destroyCurrentPage,
};
