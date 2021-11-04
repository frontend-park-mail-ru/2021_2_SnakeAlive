import BasicView from './view';
import { DataType, dispatcher, EventType, Token } from '@/dispatcher';
import { Form, loginHTML, makeSimpleButton } from '@/components';

import { submitLoginData } from '@/actions';
import { formLoginConfig } from '@/components/simple_form/login_conf';
import { pathsURLfrontend } from '@/constants';

export default class LoginView extends BasicView {
	#tokens: Token[];

	#form: Form | undefined;

	constructor() {
		super('#content');

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.SET_VALIDATION_ERROR_LOGIN, this.#setErrors),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
		this.setView(loginHTML());
		const formPlaceElement = document.querySelector('#form_place');
		if (formPlaceElement !== null) {
			this.#form = new Form(formLoginConfig, formPlaceElement);
			this.#form.setButtonEvent(this.#submit);
		}
	};

	#submit = (values: { [key: string]: string }) => {
		const { email, password } = values;
		dispatcher.notify(submitLoginData(email, password));
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
