import { Button } from './components/bundle.js';
import { showLoginForm, showRegisterForm } from './forms/bundle.js';

const main = () => {
	const btnLogin = new Button();
	btnLogin.makeButton('Вход', 'btnHead', 'loginMainPage', header);
	btnLogin.addClickListener(showLoginForm);
	btnLogin.setActive();

	const btnRegister = new Button();
	btnRegister.makeButton('Зарегистрироваться', 'btnHead', 'signupMainPage', header);
	btnRegister.addClickListener(showRegisterForm);
	btnRegister.setActive();
};

main();

const returnToMain = () => {
	document.getElementById('popup-place').innerHTML = '';
};

export { returnToMain };
