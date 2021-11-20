import BasicView from './view';
import { DataType, dispatcher, EventType, Token } from '@/dispatcher/';
import { Form, makeSimpleButton, registerHTML } from '@/components';

import { submitRegisterData } from '@/actions/auth';
import { pathsURLfrontend } from '@/constants';
import { formRegisterConfig } from '@/components/simple_form/register_conf';

export default class RegisterView extends BasicView {
	#tokens: Token[];

	#form: Form | undefined;

	constructor() {
		super('#content');

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.SHOW_REGISTER_FORM, this.createPage),
			dispatcher.register(EventType.SET_VALIDATION_ERROR_REGISTER, this.#setErrors),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
	};

	createPage = (metadata: DataType) => {
		this.setView(registerHTML());
		const formPlaceElement = document.querySelector('#form_place');
		if (formPlaceElement !== null) {
			this.#form = new Form(formRegisterConfig, formPlaceElement);
			this.#form.setButtonEvent(this.#submit);
		}
		makeSimpleButton('go-log', pathsURLfrontend.login);
	};

	#submit = (values: { [key: string]: string }) => {
		// const data: Map<string, string> = new Map([
		// 	["email", "test"],
		// 	["password", "test"],
		// ]);
		dispatcher.notify(
			submitRegisterData(
				values.name,
				values.surname,
				values.email,
				values.password,
				values.repeatedPassword
			)
		);
		// dispatcher.notify(submitRegisterData('test', 'test', '', '', ''));
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
