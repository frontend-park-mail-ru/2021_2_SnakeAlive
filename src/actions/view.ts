import { Empty, Event } from '../dispatcher/index';

const destroyInnerRequest = 'DESTROY_INNER_REQUEST';

const newDestroyInnerRequest = (): Event =>
	<Event>{
		key: destroyInnerRequest,
		metadata: <Empty>{},
	};

const destroyCountryPage = 'DESTROY_COUNTRY_PAGE';

const newDestroyCountryPage = (): Event =>
	<Event>{
		key: destroyCountryPage,
		metadata: <Empty>{},
	};

export { destroyInnerRequest, destroyCountryPage, newDestroyInnerRequest, newDestroyCountryPage };
