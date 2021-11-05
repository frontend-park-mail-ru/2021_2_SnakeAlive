import { Empty, ErrorMsgData, EventType, IEvent } from '../dispatcher';

const newInitPageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const initCountryPageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_COUNTRY_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const initRegisterPageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_REGISTER_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const initLoginPageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_LOGIN_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const initSightPageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_SIGHT_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const initTripPageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_TRIP_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const destroyCurrentPage = (): IEvent =>
	<IEvent>{
		key: EventType.DESTROY_CURRENT_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const initErrorPageRequest = (error: Error): IEvent =>
	<IEvent>{
		key: EventType.INIT_ERROR_PAGE_REQUEST,
		metadata: <ErrorMsgData>{
			error,
		},
	};

const initProfilePageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_PROFILE_PAGE_REQUEST,
		metadata: <Empty>{},
	};

export {
	newInitPageRequest,
	initLoginPageRequest,
	initRegisterPageRequest,
	initCountryPageRequest,
	initTripPageRequest,
	initSightPageRequest,
	initErrorPageRequest,
	destroyCurrentPage,
	initProfilePageRequest,
};
