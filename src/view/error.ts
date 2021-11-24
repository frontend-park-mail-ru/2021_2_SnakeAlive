import BasicView from '@/view/view';
import { DataType, dispatcher, EventType, Token } from '@/dispatcher';

import picture from '@/../image/snake_error.svg';
import errorPage from '@/components/errorPage.handlebars';
import { newSetMainHeaderRequest } from '@/actions/header';

export default class ErrorView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');

		this.#tokens = [];
	}

	init = (err: Error): void => {
		dispatcher.notify(newSetMainHeaderRequest());

		const { message } = err; // упростить нельзя, тк handlebars не хочет читать поля напрямую
		this.setView(errorPage({ message, picture }));
		this.#tokens = [dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy)];
	};

	#destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
