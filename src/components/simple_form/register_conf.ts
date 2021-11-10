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
			id: 'name',
		},
		{
			type: 'text',
			name: 'surname',
			id: 'surname',
		},
		{
			type: 'email',
			name: 'email',
			id: 'email',
		},
		{
			type: 'password',
			name: 'password',
			id: 'password',
		},
		{
			type: 'password',
			name: 'repeatedPassword',
			id: 'repeatedPassword',
		},
	],
};
