import loginTemplate from './login.handlebars';
import registerTemplate from './register.handlebars';
import { Button, makeSimpleButton } from '@/components';
import { router } from '@/router';
import { texts } from '../texts';

import './auth.scss';
import { pathsURLfrontend } from '@/constants';

// const loginHTML = (): { view: string, form: Form } => {
const loginHTML = (): string => {
	const parent = document.createElement('div');

	const formPlace: HTMLDivElement = document.createElement('div');
	formPlace.id = 'form_place';
	formPlace.classList.add('frame');
	formPlace.classList.add('form_place');

	const textPlace: HTMLDivElement = document.createElement('div');
	textPlace.id = 'text_place';
	textPlace.classList.add('frame');
	textPlace.classList.add('text_place');
	textPlace.innerHTML = loginTemplate();

	parent.appendChild(formPlace);
	parent.appendChild(textPlace);

	parent.classList.add('auth_page');

	const grandparent = document.createElement('div');
	grandparent.appendChild(parent);

	makeSimpleButton('go-reg', pathsURLfrontend.register);

	console.log(grandparent.innerHTML);
	return grandparent.innerHTML;
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
	btn.makeButton(texts.BTN_GO_FROM_REG_TO_LOGIN, ['usual_button usual_button_light'], 'to_login', textPlace);
	btn.addClickListener(() => {
		router.go('/login');
	});
	btn.setActive();

	parent.appendChild(formPlace);
	parent.appendChild(textPlace);

	return parent;
};

export { loginHTML, registerHTML };
