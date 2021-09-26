import { Button } from './components/bundle.js';
import { showLoginForm, showRegisterForm, showCountrySights } from './forms/bundle.js';

const main = () => {
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

main();

const returnToMain = (response, email) => {
	document.getElementById('popup-place').innerHTML = '';

	if (response != null) {
		if (response.status === 200) {
			document.getElementById('register-place-h').innerHTML = '';
			const btnExit = new Button();
			btnExit.makeButton(
				'Выйти',
				'btn-h',
				'exitMainPage',
				document.getElementById('register-place-h')
			);

			document.getElementById('login-place-h').innerHTML = email;
		}
	}
};

export { returnToMain };
