import { FormConfig } from '@/components';

export const formLoginConfig: FormConfig = {
	formId: 'login',
	formName: 'Вход',
	cssClass: 'auth_form',
	button: {
		text: 'Войти',
		cssClass: ['usual_button', 'usual_button_dark'],
		id: 'login-btn',
	},
	inputCssClass: 'auth_form__input',
	inputs: [
		{
			type: 'email',
			name: 'Электронная почта',
			id: 'email_holder',
		},
		{
			type: 'password',
			name: 'Пароль',
			id: 'password_holder',
		},
	],
};
