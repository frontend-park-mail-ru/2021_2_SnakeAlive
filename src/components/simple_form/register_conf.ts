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
			name: 'Имя',
			id: 'name_holder',
		},
		{
			type: 'text',
			name: 'Фамилия',
			id: 'surname_holder',
		},
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
		{
			type: 'password',
			name: 'Пароль второй раз',
			id: 'repeatedPassword_holder',
		},
	],
};
