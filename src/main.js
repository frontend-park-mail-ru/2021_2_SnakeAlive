import { Button } from './components/bundle.js';
import { showLoginForm } from './forms/bundle.js';

const main = () => {
	const header = document.getElementById('header');

	const btnLogin = new Button('Войти', 'startBtn', 'login', header);
	btnLogin.addClickListener(showLoginForm);
	// const btnSignup = new Button('Зарегистрироваться', 'startBtn', 'signup', header);
};

main();
