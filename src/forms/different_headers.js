import { Button } from '../components';
import { showLoginForm } from './login.js';
import { showRegisterForm } from './register.js';
import { sendGetJSONRequest } from '../http';
import { forgetAuth } from '../constants/uris.js';

/**
 * Функция выставляет в существующий html div#header содержание для не залогиненного пользователя
 */
const setGuestHeader = () => {
	const loginPlace = document.getElementById('login-place-h');
	loginPlace.innerHTML = '';
	const btnLogin = new Button();
	btnLogin.makeButton('Вход', 'btn-h', 'loginMainPage', loginPlace);
	btnLogin.addClickListener(showLoginForm);
	btnLogin.setActive();

	const registerPlace = document.getElementById('register-place-h');
	registerPlace.innerHTML = '';
	const btnRegister = new Button();
	btnRegister.makeButton('Регистрация', 'btn-h', 'signupMainPage', registerPlace);
	btnRegister.addClickListener(showRegisterForm);
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
		sendGetJSONRequest(forgetAuth)
			.then(setGuestHeader)
			.catch(error => console.log(error));
	});
	btnExit.setActive();
};

export { setGuestHeader, setUserHeader, showLoginForm, showRegisterForm };
