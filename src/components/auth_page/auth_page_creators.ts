import loginTemplate from './login.handlebars';
import registerTemplate from './register.handlebars';
import { Button } from '@/components';
import { router } from '@/router';

const loginHTML = (parent: HTMLDivElement): HTMLDivElement => {
	const formPlace: HTMLDivElement = document.createElement('div');
	formPlace.id = 'form_place';
	formPlace.classList.add('frame');

	const textPlace: HTMLDivElement = document.createElement('div');
	textPlace.id = 'text_place';
	textPlace.classList.add('frame');
	textPlace.innerHTML = loginTemplate();

	const btn = new Button();
	btn.makeButton(
		'Перейти к регистрации', 'btn-css-ept', 'to_register', textPlace
	);
	btn.addClickListener(() => {router.go('/register')});

	parent.appendChild(formPlace);
	parent.appendChild(textPlace);

	return formPlace;
}

export { loginHTML };