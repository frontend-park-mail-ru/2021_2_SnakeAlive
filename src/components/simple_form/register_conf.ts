import { FormConfig } from '@/components';

export const formRegisterConfig: FormConfig = {
	formId: 'register',
	formName: 'Регистрация',
	cssClass: 'auth_form',
	button: {
		text: 'Зарегистрироваться',
		cssClass: ['usual_button', 'usual_button_dark'],
		id: 'login-btn',
	},
	inputCssClass: 'auth_form__input',
	inputs: [
		{
			type: 'text',
			name: 'name',
			id: 'name_holder',
		},
		{
			type: 'text',
			name: 'surname',
			id: 'surname_holder',
		},
		{
			type: 'email',
			name: 'email',
			id: 'email_holder',
		},
		{
			type: 'password',
			name: 'password',
			id: 'password_holder',
		},
		{
			type: 'password',
			name: 'repeatedPassword',
			id: 'repeatedPassword_holder',
		},
	],
};
