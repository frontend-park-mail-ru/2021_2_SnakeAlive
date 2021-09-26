import { validateLoginData, ValidationError } from '../validation/bundle.js';
import { sendPostJSONRequest } from '../http/bundle.js';
import { FormConfig, Form } from '../components/bundle.js';
import { backendEndpoint, loginURI } from '../constants/bundle.js';
// import { createHtml } from '../http/readTemplate.js';

const loginUser = (input) =>
	validateLoginData(input)
		.then(() => {
			const email = input.email;
			const password = input.pswd;
			return sendPostJSONRequest(backendEndpoint + loginURI, {
				email,
				password,
			})
		}
		)
		.then(response => {
			if (response.status === 404) {
				return Promise.reject(
					new ValidationError('Не зарегистрирован такой пользователь', 'email')
				);
			}
			if (response.status === 400) {
				return Promise.reject(new ValidationError('Неверный пароль', 'pswd'));
			}

			return response;
		});

const showLoginForm = () => {
	var source = document.getElementById('template-popup-form').innerHTML;
	var template = Handlebars.compile(source);

	const formInfo = new FormConfig(
		'loginForm',
		'Вход',
		'startForm',
		{
			text: 'Войти',
			id: 'login',
			cssClass: 'btn-black',
		},
		'startInput',
		[
			{
				type: 'email',
				name: 'Почта',
				id: 'email',
			},
			{
				type: 'password',
				name: 'Пароль',
				id: 'pswd',
			},
		]
	);

	var html = template(formInfo);
	document.getElementById('popup-place').innerHTML = html;

	const loginForm = new Form(formInfo);
	loginForm.setButtonEvent(loginUser);

};

export { showLoginForm, loginUser };
