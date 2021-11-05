import { Empty, IEvent } from '../dispatcher/index';
import { EventType } from '@/dispatcher/event_types';

const newRemoveHeaderRequest = (): IEvent =>
	<IEvent>{
		key: EventType.REMOVE_HEADER_REQUEST,
		metadata: <Empty>{},
	};

const newSetMainHeaderRequest = (): IEvent =>
	<IEvent>{
		key: EventType.SET_MAIN_HEADER_REQUEST,
		metadata: <Empty>{},
	};

const newSetMainHeaderLoggedResponse = (): IEvent =>
	<IEvent>{
		key: EventType.SET_MAIN_HEADER_LOGGED_RESPONSE,
		metadata: <Empty>{},
	};

const newSetMainHeaderBasicResponse = (): IEvent =>
	<IEvent>{
		key: EventType.SET_MAIN_HEADER_BASIC_RESPONSE,
		metadata: <Empty>{},
	};

const newSetEmptyHeaderRequest = (): IEvent =>
	<IEvent>{
		key: EventType.SET_MAIN_HEADER_EMPTY_REQUEST,
		metadata: <Empty>{},
	};

const newSetMainHeaderStrongRequest = (): IEvent =>
	<IEvent>{
		key: EventType.SET_MAIN_HEADER_STRONG_REQUEST,
		metadata: <Empty>{},
	};

const newSetEmptyHeaderResponse = (): IEvent =>
	<IEvent>{
		key: EventType.SET_MAIN_HEADER_EMPTY_RESPONSE,
		metadata: <Empty>{},
	};

export {
	newSetMainHeaderRequest,
	newSetMainHeaderLoggedResponse,
	newSetMainHeaderBasicResponse,
	newRemoveHeaderRequest,
	newSetEmptyHeaderRequest,
	newSetEmptyHeaderResponse,
	newSetMainHeaderStrongRequest,
};
