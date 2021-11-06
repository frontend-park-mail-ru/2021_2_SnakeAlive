import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import { newSetMainHeaderRequest } from '@/actions';
import { storage } from '@/storage';
import { createSightTemplate, initReviewForm } from '@/components';

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
	};

	#setSight = (metadata: EventType): void => {
		dispatcher.notify(newSetMainHeaderRequest());
		this.setView(createSightTemplate(storage.getSight()));
		initReviewForm();

		// this.setView(`<div class='full-page'>${JSON.stringify(storage.getSight(), null, 4)}</div>`);
	};

	#destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
