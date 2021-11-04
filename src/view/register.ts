import BasicView from './view';
import { DataType, dispatcher, EventType, Token } from '@/dispatcher/';
import { registerHTML } from '@/components';

import { newSetEmptyHeaderResponse, submitRegisterData } from '../actions';

export default class RegisterView extends BasicView {
	#tokens: Token[];

	// #formElement: HTMLElement;

	constructor() {
		super('#content');

		// this.#formElement = registerHTML(place);

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.SET_VALIDATION_ERROR_REGISTER, this.#setErrors),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
	};

	#submit = () => {
		// const data: Map<string, string> = new Map([
		// 	["email", "test"],
		// 	["password", "test"],
		// ]);
		dispatcher.notify(submitRegisterData('test', 'test', '', '', ''));
	};

	#setErrors = (metadata: DataType) => {
		alert(metadata);
	};

	#destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
