import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import { newSetMainHeaderRequest } from '@/actions';
import { storage } from '@/storage';

export default class TripView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_TRIP_RESPONSE, this.#setSight),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
		dispatcher.notify(newSetMainHeaderRequest());
		console.log('trip started');
		this.setView(`<p class="full-screen">trip. hope to get server response</p>`);
	};

	#setSight = (metadata: EventType): void => {
		this.setView(storage.getTrip().toString());
	};

	#destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
