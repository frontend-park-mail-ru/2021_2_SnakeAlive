import { sendGetJSONRequest, HttpError } from '../http/index.js';
import { backendEndpoint, logout, profile } from '../constants/index.js';
import { Button, Form, FormConfig, formHTML } from '../components/index.js';
import { showCountrySights } from './country_sights.js';
import { flushPopup } from './flush_popup.js';
import { loginUser } from './login.js';
import { registerUser } from './register.js';

/**
 * Функция конструирует и добавляет в index.html форму регистрации
 */
const showRegisterForm = (callbacks = []) => {
	const formInfo = new FormConfig(
		'signupForm',
		'Регистрация',
		'startForm',
		{
			text: 'Поехали!',
			id: 'signup',
			cssClass: 'btn-black',
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
			{
				type: 'password',
				name: 'Повторите пароль',
				id: 'pswdRepeated',
			},
		],
		flushPopup
	);
	document.getElementById('popup-place').innerHTML = formHTML(formInfo);

	const signupForm = new Form(formInfo);
	signupForm.setButtonEvent(registerUser, callbacks);
};

/**
 * Функция создает форму регистрации как объект и как код в html
 */
const showLoginForm = (callbacks = []) => {
	const formInfo = new FormConfig(
		'loginForm',
		'Вход',
		'startForm',
		{
			text: 'Готово',
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
		],
		flushPopup
	);

	document.getElementById('popup-place').innerHTML = formHTML(formInfo);
	const loginForm = new Form(formInfo);
	loginForm.setButtonEvent(loginUser, callbacks);
};

/**
 * Функция выставляет в существующий html div#header содержание для не залогиненного пользователя
 */
const setGuestHeader = (callbacks = []) => {
	const login = () => showLoginForm(callbacks);
	const loginPlace = document.getElementById('login-place-h');
	loginPlace.innerHTML = '';
	const btnLogin = new Button();
	btnLogin.makeButton('Вход', 'btn-h', 'loginMainPage', loginPlace);
	btnLogin.addClickListener(login);
	btnLogin.setActive();

	const register = () => showRegisterForm(callbacks);
	const registerPlace = document.getElementById('register-place-h');
	registerPlace.innerHTML = '';
	const btnRegister = new Button();
	btnRegister.makeButton('Регистрация', 'btn-h', 'signupMainPage', registerPlace);
	btnRegister.addClickListener(register);
	btnRegister.setActive();
};

/**
 * Функция выставляет в существующий html div#header содержание для залогиненного пользователя
 * @param {Object} user Пользователь из http ответа сервера
 * @param {String} user.name Имя пользователя
 * @param {String} user.surname Фамилия пользователя
 */
const setUserHeader = user => {
	const template = Handlebars.templates.header_user;
	document.getElementById('login-place-h').innerHTML = template(user);

	const btnExit = new Button();
	btnExit.makeButton('Выход', 'btn-h', 'exitMainPage', document.getElementById('register-place-h'));
	btnExit.addClickListener(() => {
		sendGetJSONRequest(logout)
			.then(setGuestHeader)
			.catch(error => console.log(error));
	});
	btnExit.setActive();
};

/**
 * Функция узнает, залогинен ли пользователь,
 * и исходя из этого вызывает нужную функцию конструирования header
 */
function chooseHeaderType() {
	sendGetJSONRequest(backendEndpoint + profile)
		.then(response => {
			if (response.status === 401) {
				return Promise.reject(new HttpError('пользователь не авторизован', response.status));
			}

			return response.json();
		})
		.then(data => setUserHeader(data))
		.catch(() => setGuestHeader([flushPopup, showCountrySights, chooseHeaderType]));
}

/**
 * Функция создает html div#header по шаблону, вставляя в него заголовок сайта (в перспективе лого)
 */
const headerHTML = () => {
	const template = Handlebars.templates.header;
	return template();
};

export { headerHTML, chooseHeaderType };
