import { Empty, ErrorMsgData, IdData, IEvent } from '../dispatcher';
import { EventType } from '@/dispatcher/event_types';

const newInitPageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const initCountryPageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_COUNTRY_PAGE_REQUEST,
		metadata: <Empty>{}
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

const initSightPageRequest = (ID: string): IEvent =>
	<IEvent>{
		key: EventType.INIT_SIGHT_PAGE_REQUEST,
		metadata: <IdData>{
			ID,
		},
	};

const initTripPageRequest = (ID: string): IEvent =>
	<IEvent>{
		key: EventType.INIT_TRIP_PAGE_REQUEST,
		metadata: <IdData>{
			ID,
		},
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

export {
	newInitPageRequest,
	initLoginPageRequest,
	initRegisterPageRequest,
	initCountryPageRequest,
	initTripPageRequest,
	initSightPageRequest,
	initErrorPageRequest,
	destroyCurrentPage,
};
