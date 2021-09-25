import { validateLoginData, ValidationError } from '../validation/bundle.js';
import { sendPostJSONRequest } from '../http/bundle.js';
import { FormRequire, Form } from '../components/bundle.js';
import { backendEndpoint, loginURI } from '../constants/bundle.js';

const loginUser = (email = '', password = '') =>
	validateLoginData(email, password)
		.then(() =>
			sendPostJSONRequest(backendEndpoint + loginURI, {
				email,
				password,
			})
		)
		.then(response => {
			if (response.status === 404) {
				return Promise.reject(
					new ValidationError('Не зарегистрирован такой адрес электронной почты', 'email')
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

	const formProperties = new FormRequire(
		'loginForm',
		'Вход',
		'startForm',
		{
			text: 'Войти',
			id: 'login',
			cssClass: 'btn-h',
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
	var html = template(formProperties);
	document.getElementById('popup-place').innerHTML = html;

	const loginForm = new Form(formProperties);
	loginForm.setButtonEvent(loginUser);
};

export { showLoginForm, loginUser };
