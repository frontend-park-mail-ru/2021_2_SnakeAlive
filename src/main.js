import { Button } from './components/bundle.js';
import { showLoginForm, showRegisterForm } from './forms/bundle.js';
import { getCards } from './getdata/cards.js';

const main = () => {
	const btnLogin = new Button();
	btnLogin.makeButton('Вход', 'btn-h', 'loginMainPage', document.getElementById('login-place-h'));
	btnLogin.addClickListener(showLoginForm);
	btnLogin.setActive();

	const btnRegister = new Button();
	btnRegister.makeButton(
		'Зарегистрироваться',
		'btn-h',
		'signupMainPage',
		document.getElementById('register-place-h')
	);
	btnRegister.addClickListener(showRegisterForm);
	btnRegister.setActive();

	// const response = 
	console.log( getCards('/country/Russia') instanceof Promise);
	// console.log(response);
	getCards('/country/Russia').then((response) =>
		console.log('успех ' + response.status), 
		(err) => console.log('проблемес ' + err));
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
