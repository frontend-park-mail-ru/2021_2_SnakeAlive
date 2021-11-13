import { Empty, IEvent } from '../dispatcher/index';
import { EventType } from '@/dispatcher/event_types';
import { IsTrue } from '@/dispatcher/metadata_types';

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

const newSetEmptyHeaderRequest = (isLogged: boolean): IEvent =>
	<IEvent>{
		key: EventType.SET_MAIN_HEADER_EMPTY_REQUEST,
		metadata: <IsTrue>{
			isTrue: isLogged,
		},
	};

const newSetMainHeaderStrongRequest = (): IEvent =>
	<IEvent>{
		key: EventType.SET_MAIN_HEADER_STRONG_REQUEST,
		metadata: <Empty>{},
	};

const newSetEmptyHeaderResponse = (isLogged: boolean): IEvent =>
	<IEvent>{
		key: EventType.SET_MAIN_HEADER_EMPTY_RESPONSE,
		metadata: <IsTrue>{
			isTrue: isLogged,
		},
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
