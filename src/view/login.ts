import BasicView from './view';
import { dispatcher, EventType, Token } from '@/dispatcher';
import { loginHTML } from '@/components';

import { DESTROY_CURRENT_PAGE, SET_VALIDATION_ERROR_LOGIN, submitLoginData } from '../actions';
import { router } from '@/router';

export default class LoginView extends BasicView {
	#tokens: Token[];

	#formElement: HTMLElement;

	constructor(place: HTMLDivElement) {
		super(place);

		this.#formElement = loginHTML(place);

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(SET_VALIDATION_ERROR_LOGIN, this.#setErrors),
			dispatcher.register(DESTROY_CURRENT_PAGE, this.#destroy),
		];
	};

	#submit = () => {
		// const data: Map<string, string> = new Map([
		// 	["email", "test"],
		// 	["password", "test"],
		// ]);
		dispatcher.notify(submitLoginData("test", "test"));
	}

	#setErrors = (metadata: EventType) => {
		alert(metadata);
	}

	#destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
