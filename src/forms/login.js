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
	const inner = document.getElementById('inner');

	const formProperties = new FormRequire(
		'startForm',
		{
			text: 'Войти',
			id: 'login',
			cssClass: 'startBtn',
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
	const loginForm = new Form(formProperties, inner);
	loginForm.setButtonEvent(loginUser);
};

export { showLoginForm, loginUser };
