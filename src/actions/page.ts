import { Empty, Event } from '../dispatcher/index';

const initPageRequest = 'INITIAL_PAGE_REQUEST';

const newInitPageRequest = (): Event =>
	<Event>{
		key: initPageRequest,
		metadata: <Empty>{},
	};

export { initPageRequest, newInitPageRequest };
