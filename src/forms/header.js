import { sendGetJSONRequest } from '../http';
import { setUserHeader, setGuestHeader } from './different_headers.js';
import { profile } from '../constants';

/**
 * Функция создает html div#header по шаблону, вставляя в него заголовок сайта (в перспективе лого)
 */
const headerHTML = () => {
	const template = Handlebars.templates.header;
	return template();
};

/**
 * Функция узнает, залогинен ли пользователь,
 * и исходя из этого вызывает нужную функцию конструирования header
 */
const setAuthToHeader = () => {
	sendGetJSONRequest(profile)
		.then(response => {
			if (response.status === 200) {
				const user = response.json();
				setUserHeader(user);
			}
		})
		.catch(error => console.log(error));
	setGuestHeader();
};

export { headerHTML, setAuthToHeader };
