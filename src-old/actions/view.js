import { Event } from '../dispatcher/index.js';

const destroyInnerRequest = 'DESTROY_INNER_REQUEST';

const newDestroyInnerRequest = () => new Event(destroyInnerRequest);

const destroyCountryCardsHolder = 'DESTROY_COUNTRY_CARDS_HOLDER';

const newDestroyCountryCardsHolder = () => new Event(destroyCountryCardsHolder);

export {
	destroyInnerRequest,
	destroyCountryCardsHolder,
	newDestroyInnerRequest,
	newDestroyCountryCardsHolder,
};
