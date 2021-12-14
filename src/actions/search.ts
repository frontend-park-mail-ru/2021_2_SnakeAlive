import { dispatcher, Empty, ErrorMsgData, EventType, IEvent } from '@/dispatcher';
import { Search } from '@/dispatcher/metadata_types';
import { searchPlaceType } from '@/models/search';

const searchRequest = (text: string, type: searchPlaceType): IEvent =>
	<IEvent>{
		key: EventType.SEARCH_REQUEST,
		metadata: <Search>{
			text,
			type,
		},
	};

const gotSearchResults = (type: searchPlaceType): IEvent =>
	<IEvent>{
		key: EventType.GOT_SEARCH_RESULTS,
		metadata: <Search>{
			type,
		},
	};

const searchSubmit = (): IEvent =>
	<IEvent>{
		key: EventType.SUBMIT_SEARCH_RESULTS,
		metadata: <Empty>{},
	};


// search page

const initEmptySearchPageResponse = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_EMPTY_SEARCH_PAGE_RESPONSE,
		metadata: <Empty>{},
	};

const initEmptySearchPageRequest = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_EMPTY_SEARCH_PAGE_REQUEST,
		metadata: <Empty>{},
	};

const sendPageSearch = (): IEvent =>
	<IEvent>{
		key: EventType.SEND_PAGE_SEARCH,
		metadata: <Empty>{},
	};

const getSearchCardsResult = () =>
	<IEvent>{
		key: EventType.GET_SEARCH_CARDS_RESULT,
		metadata: <Empty>{},
	};

const newGetSearchCardsError = (error: Error): IEvent =>
	<IEvent>{
		key: EventType.GET_COUNTRY_CARDS_ERROR,
		metadata: <ErrorMsgData>{
			error,
		},
	};

export {
	searchRequest,
	gotSearchResults,
	searchSubmit,
	initEmptySearchPageResponse,
	initEmptySearchPageRequest,
	sendPageSearch,
	getSearchCardsResult,
	newGetSearchCardsError
};
