import BasicView from '@/view/view';
import { dispatcher, EventType, Token } from '@/dispatcher';

import picture from '@/../image/snake_error.svg';
import errorPage from '@/components/errorPage.handlebars';
import offlinePage from '@/components/offline.handlebars';
import { newSetMainHeaderRequest } from '@/actions/header';
import { makeHeader } from '@/components/header/header';

export default class ErrorView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#content');

		this.#tokens = [];
	}

	init = (err: Error): void => {
		dispatcher.notify(newSetMainHeaderRequest());

	 let { message } = err; // упростить нельзя, тк handlebars не хочет читать поля напрямую
		if (message === 'Unexpected token < in JSON at position 0') {
			message = "неожиданный ответ. Уже чиним";
		}
		this.setView(errorPage({ message, picture }));
		this.#tokens = [dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy)];
	};

	initOffline = (): void => {
		const dataTemplate = {
			isNotEmpty: false,
			isUser: false,
		};
		const header = document.getElementById('header');
		if (header !== null) {
			header.innerHTML = makeHeader(dataTemplate);
		}

		this.setView(offlinePage());

		const refreshButton = document.getElementById('refresh');
		if (refreshButton !== null) {
			refreshButton.addEventListener('click', event => {
				event.preventDefault();
				document.location.reload();
			});
		}

		this.#tokens = [dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy)];
	};

	#destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
