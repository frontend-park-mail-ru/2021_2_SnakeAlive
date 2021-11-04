import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import { newSetMainHeaderRequest } from '@/actions';
import { storage } from '@/storage';

export default class SightView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');
		this.#tokens = [];
	}

	init = (): void => {

		this.#tokens = [
			dispatcher.register(EventType.GET_SIGHT_RESPONSE, this.#setSight),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
		console.log("REGISTERED");
		dispatcher.notify(newSetMainHeaderRequest());
		this.setView(`<p class='full-screen'>sight. hope to get server response</p>`);
	};

	#setSight = (metadata: EventType): void => {
		this.setView(`<div class='full-page'>${JSON.stringify(storage.getSight(), null, 4)}</div>`);
	}

	#destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}