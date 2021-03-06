import BasicView from './view';
import { dispatcher, EventType, Token, ValidationErrData } from '@/dispatcher/';
import { Form, makeSimpleButton, registerHTML } from '@/components';

import { submitRegisterData } from '@/actions/auth';
import { pathsURLfrontend } from '@/constants';
import { formRegisterConfig } from '@/components/simple_form/register_conf';
import {
	validateElements,
	validateLength,
	validateNotEmpty,
	validateEmail,
	validateEqual,
} from '@/validators/common';
import Input from '@/components/minified/input/input';

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
			dispatcher.register(EventType.SET_VALIDATION_ERROR_REGISTER, this.setErrors),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.#destroy),
		];
	};

	createPage = () => {
		this.setView(registerHTML());
		const formPlaceElement = document.querySelector('#form_place');
		if (formPlaceElement !== null) {
			this.#form = new Form(formRegisterConfig, formPlaceElement);
			this.#form.setButtonEvent(this.#submit);
		}
		makeSimpleButton('go-log', pathsURLfrontend.login);
	};

	#submit = (values: { [key: string]: string }) => {
		// eslint-disable-next-line camelcase
		const { name_holder, surname_holder, email_holder, password_holder, repeatedPassword_holder } =
			values;
		const nameInput: Input = new Input('#name_holder', 'input-error-red');
		const surnameInput: Input = new Input('#surname_holder', 'input-error-red');
		const emailInput: Input = new Input('#email_holder', 'input-error-red');
		const passInput: Input = new Input('#password_holder', 'input-error-red');
		const repasswordInput: Input = new Input('#repeatedPassword_holder', 'input-error-red');
		const metadata: ValidationErrData = {
			data: [],
		};
		if (
			!validateElements([
				{
					validators: [
						function (): boolean {
							if (validateNotEmpty(nameInput.getValue())) {
								return true;
							}
							metadata.data.push({ error: '?????? ???? ?????????? ???????? ????????????', name: 'wrong_name' });
							return false;
						},
					],
					errorSetters: [nameInput],
				},
				{
					validators: [
						function (): boolean {
							if (validateNotEmpty(surnameInput.getValue())) {
								return true;
							}
							metadata.data.push({ error: '?????????????? ???? ?????????? ???????? ????????????', name: 'wrong_surname' });
							return false;
						},
					],
					errorSetters: [surnameInput],
				},
				{
					validators: [
						function (): boolean {
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
						function (): boolean {
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
				{
					validators: [
						function (): boolean {
							if (validateEqual(passInput.getValue(), repasswordInput.getValue())) {
								return true;
							}
							metadata.data.push({ error: '???????????? ???? ??????????????????', name: 'wrong_repeatedPassword' });
							return false;
						},
					],
					errorSetters: [passInput, repasswordInput],
				},
			])
		) {
			this.setErrors(metadata);
			return;
		}
		dispatcher.notify(
			submitRegisterData(
				name_holder,
				surname_holder,
				email_holder,
				password_holder,
				repeatedPassword_holder
			)
		);
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

	#destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};
}
