import { Button } from './components/bundle.js';
import { showLoginForm, showRegisterForm } from './forms/bundle.js';
import { getCards, showErrorPage } from './getdata/bundle.js';

const main = () => {
	alert(document.cookie);

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

	const cards = null;
	getCards('/country/Russia').then(
		response => {
			console.log('успех ' + response.status);
			cards = response;
		},
		err => showErrorPage(err)
	);
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
	// console.log(getCards('/country/Russia'));
};

export { returnToMain };
