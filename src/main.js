import { Button } from './components/bundle.js';
import { showLoginForm, showRegisterForm } from './forms/bundle.js';

const main = () => {
	const btnLogin = new Button();
	btnLogin.makeButton('Вход', 'btn-h', 'loginMainPage', document.getElementById('login-place-h'));
	btnLogin.addClickListener(showLoginForm);
	btnLogin.setActive();

	const btnRegister = new Button();
	btnRegister.makeButton('Зарегистрироваться', 'btn-h', 'signupMainPage', document.getElementById('register-place-h'));
	btnRegister.addClickListener(showRegisterForm);
	btnRegister.setActive();
};

main();

const returnToMain = () => {
	document.getElementById('popup-place').innerHTML = '';
};

export { returnToMain };
