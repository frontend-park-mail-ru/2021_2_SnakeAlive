import { Button } from './components';
import { showLoginForm, showRegisterForm, showCountrySights } from './forms';

const returnToMain = () => {
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

	showCountrySights();
};

returnToMain();

export { returnToMain };
