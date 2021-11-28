import { Empty, EventType, IEvent, NamedUUID, NumID } from '@/dispatcher';
import { Search } from '@/dispatcher/metadata_types';

const searchRequest = (text: string, type: string): IEvent =>
	<IEvent>{
		key: EventType.SEARCH_REQUEST,
		metadata: <Search>{
			text,
			type,
		},
	};

const gotSearchResults = (type: string): IEvent =>
	<IEvent>{
		key: EventType.GOT_SEARCH_RESULTS,
		metadata: <Search>{
			type,
		},
	};


const searchSubmit = (): IEvent =>
	<IEvent>{
		key: EventType.SUBMIT_SEARCH_RESULTS,
		metadata: <Empty>{}
	};
	

export { searchRequest, gotSearchResults, searchSubmit };
