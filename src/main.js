import { Button } from './components/bundle.js';
import { getCards, showErrorPage } from './validation/getdata/bundle.js';
import { showLoginForm, showRegisterForm, showCountrySights } from './forms/bundle.js';

const returnToMain = (response) => {
	document.getElementById('popup-place').innerHTML = '';

	if (response != null) {
		if (response.status === 200) {
			document.getElementById('register-place-h').innerHTML = '';
			document.getElementById('login-place-h').innerHTML = 'Я есть авторизован';
			// console.log("cookie: ", document.cookie);
		}
	} else {
		const btnLogin = new Button();
		btnLogin.makeButton('Вход', 'btn-h', 'loginMainPage', document.getElementById('login-place-h'));
		btnLogin.addClickListener(showLoginForm);
		btnLogin.setActive();
	
		const btnRegister = new Button();
		btnRegister.makeButton(
			'Регистрация',
			'btn-h',
			'signupMainPage',
			document.getElementById('register-place-h')
		);
		btnRegister.addClickListener(showRegisterForm);
		btnRegister.setActive();
	}
	showCountrySights();
}

returnToMain();

export { returnToMain }
