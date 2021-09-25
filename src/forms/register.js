import { backendEndpoint, registerURI } from '../constants/bundle.js';
import { validateRegisterData, ValidationError } from '../validation/bundle.js';
import { FormRequire, Form } from '../components/bundle.js';
import { sendPostJSONRequest } from '../http/bundle.js';

const registerUser = (name = '', surname = '', email = '', password = '') =>
	validateRegisterData(name, surname, email, password)
		.then(() =>
			sendPostJSONRequest(backendEndpoint + registerURI, {
				email,
				password,
				name,
				surname,
			})
		)
		.then(response => {
			if (response.status === 400) {
				return Promise.reject(
					new ValidationError('Пользователь с таким емэйлом уже существует', 'email')
				);
			}

			return response;
		});

const showRegisterForm = () => {
	var source = document.getElementById('template-popup-form').innerHTML;
	var template = Handlebars.compile(source);

	const formProperties = new FormRequire(
		'signupForm',
		'Регистрация',
		'startForm',
		{
			text: 'Зарегистрироваться',
			id: 'signup',
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
				type: 'text',
				name: 'Имя',
				id: 'name',
			},
			{
				type: 'text',
				name: 'Фамилия',
				id: 'surname',
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

	const signupForm = new Form(formProperties);
	signupForm.setButtonEvent(registerUser);
};

export { showRegisterForm, registerUser };
