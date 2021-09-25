import { backendEndpoint, registerURI } from '../constants/bundle.js';
import { validateRegisterData, ValidationError } from '../validation/bundle.js';
import { FormRequire, Form, RegisterInputs } from '../components/bundle.js';
import { sendPostJSONRequest } from '../http/bundle.js';

const registerUser = (registerInputs) => {
	

	return validateRegisterData(registerInputs)
		.then(() => {
			const email = registerInputs.email;
			const password = registerInputs.pswd;
			const name = registerInputs.name;
			const surname = registerInputs.surname;
			return sendPostJSONRequest(backendEndpoint + registerURI, {
				email,
				password,
				name,
				surname,
			})
		})
		.then(response => {
			if (response.status === 400) {
				return Promise.reject(
					new ValidationError('Пользователь с таким емэйлом уже существует', 'email')
				);
			}
			// console.log(email);
			return response;
		});
};

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

	const signupForm = new Form(formProperties);
	signupForm.setButtonEvent(registerUser);
};

export { showRegisterForm, registerUser };
