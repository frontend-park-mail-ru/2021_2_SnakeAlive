import BasicView from './view';
import { dispatcher, EventType, Token, ValidationErrData } from '@/dispatcher';
import { Form, loginHTML, makeSimpleButton } from '@/components';

import { submitLoginData } from '@/actions/auth';
import { formLoginConfig } from '@/components/simple_form/login_conf';
import { pathsURLfrontend } from '@/constants';

import Input from '@/components/minified/input/input';
import {
	validateElements,
	validateLength,
	validateNotEmpty,
	validateEmail,
} from '@/validators/common';

export default class LoginView extends BasicView {
	#tokens: Token[];

	#form: Form | undefined;

	constructor() {
		super('#content');

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.SHOW_LOGIN_FORM, this.createPage),
			dispatcher.register(EventType.SET_VALIDATION_ERROR_LOGIN, this.setErrors),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	createPage = () => {
		this.setView(loginHTML());
		const formPlaceElement = document.querySelector('#form_place');
		if (formPlaceElement !== null) {
			this.#form = new Form(formLoginConfig, formPlaceElement);
			this.#form.setButtonEvent(this.#submit);
		}
		makeSimpleButton('go-reg', pathsURLfrontend.register);
	};

	setErrors = (metadata: ValidationErrData) => {
		const errors: Error[] = [];
		metadata.data.forEach(err => {
			const newErr = new Error(err.error);
			newErr.name = err.name;
			errors.push(newErr);
		});
		this.#form?.setFormErrors(errors);
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	#submit = (values: { [key: string]: string }) => {
		const emailHolder = values.email_holder;
		const passwordHolder = values.password_holder;
		const emailInput: Input = new Input('#email_holder', 'input-error-red');
		const passInput: Input = new Input('#password_holder', 'input-error-red');
		const metadata: ValidationErrData = {
			data: [],
		};
		if (
			!validateElements([
				{
					validators: [
						(): boolean => {
							if (!validateEmail(emailInput.getValue())) {
								metadata.data.push({ error: '???????????????????????? ???????????????????? ??????????', name: 'wrong_email' });
							}
							return validateEmail(emailInput.getValue());
						},
					],
					errorSetters: [emailInput],
				},
				{
					validators: [
						(): boolean => {
							if (
								validateNotEmpty(passInput.getValue()) &&
								validateLength(passInput.getValue(), 8)
							) {
								return true;
							}
							metadata.data.push({
								error: '???????????? ???????????? ?????????????????? ???? ?????????? 8 ????????????????',
								name: 'wrong_password',
							});
							return false;
						},
					],
					errorSetters: [passInput],
				},
			])
		) {
			this.setErrors(metadata);
			return;
		}
		dispatcher.notify(submitLoginData(emailHolder, passwordHolder));
	};
}
