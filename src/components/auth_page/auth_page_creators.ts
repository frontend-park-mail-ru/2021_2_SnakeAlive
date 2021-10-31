import loginTemplate from './login.handlebars';
import registerTemplate from './register.handlebars';
import { Button } from '@/components';
import { router } from '@/router';
import { texts } from '../texts';

const loginHTML = (parent: HTMLDivElement): HTMLDivElement => {
	const formPlace: HTMLDivElement = document.createElement('div');
	formPlace.id = 'form_place';
	formPlace.classList.add('frame');

	const textPlace: HTMLDivElement = document.createElement('div');
	textPlace.id = 'text_place';
	textPlace.classList.add('frame');
	textPlace.innerHTML = loginTemplate();

	const btn = new Button();
	btn.makeButton(texts.BTN_GO_FROM_LOGIN_RO_REG, 'btn-css-ept', 'to_register', textPlace);
	btn.addClickListener(() => {
		router.go('/signup');
	});
	btn.setActive();

	parent.appendChild(formPlace);
	parent.appendChild(textPlace);

	return formPlace;
};

const registerHTML = (parent: HTMLDivElement): HTMLDivElement => {
	const formPlace: HTMLDivElement = document.createElement('div');
	formPlace.id = 'form_place';
	formPlace.classList.add('frame');

	const textPlace: HTMLDivElement = document.createElement('div');
	textPlace.id = 'text_place';
	textPlace.classList.add('frame');
	textPlace.innerHTML = registerTemplate();

	const btn = new Button();
	btn.makeButton(texts.BTN_GO_FROM_REG_TO_LOGIN, 'btn-css-ept', 'to_login', textPlace);
	btn.addClickListener(() => {
		router.go('/login');
	});
	btn.setActive();

	parent.appendChild(formPlace);
	parent.appendChild(textPlace);

	return formPlace;
};

export { loginHTML, registerHTML };
