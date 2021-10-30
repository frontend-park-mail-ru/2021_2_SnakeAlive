import { Event } from '../dispatcher/index.js';

const initPageRequest = 'INITIAL_PAGE_REQUEST';

const newInitPageRequest = () => new Event(initPageRequest);

export { initPageRequest, newInitPageRequest };
