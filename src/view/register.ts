import BasicView from './view';
import { dispatcher, EventType, Token } from '@/dispatcher/';
import { registerHTML } from '@/components';

import {
	DESTROY_CURRENT_PAGE,
	newSetEmptyHeaderResponse,
	SET_VALIDATION_ERROR_REGISTER,
	submitRegisterData,
} from '../actions';

export default class RegisterView extends BasicView {
	#tokens: Token[];

	#formElement: HTMLElement;

	constructor(place: HTMLDivElement) {
		super(place);

		this.#formElement = registerHTML(place);

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(SET_VALIDATION_ERROR_REGISTER, this.#setErrors),
			dispatcher.register(DESTROY_CURRENT_PAGE, this.#destroy),
		];
	};

	#submit = () => {
		// const data: Map<string, string> = new Map([
		// 	["email", "test"],
		// 	["password", "test"],
		// ]);
		dispatcher.notify(submitRegisterData('test', 'test', '', '', ''));
	};

	#setErrors = (metadata: EventType) => {
		alert(metadata);
	};

	#destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
