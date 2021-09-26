import { Button } from './components/bundle.js';
import { showLoginForm, showRegisterForm } from './forms/bundle.js';
import { getCards, showErrorPage } from './validation/getdata/bundle.js';


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

	// let cards = null;
	getCards('/country/Russia')
	.then(response => response.json())
	.then(cards => Promise.resolve(console.log(cards)))
	.catch(err => showErrorPage(err));
};

main();

const returnToMain = (response) => {
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

			
			let cards = null;
			getCards('/country/Russia')
			.then(response => response.json())
			.then(cards => Promise.resolve(console.log(cards.Name)))
			.catch(err => showErrorPage(err));
			document.getElementById('login-place-h').innerHTML = '';
			document.getElementById('login-place-h').innerHTML = cards.Name;
	}
	
}
};

export { returnToMain };
