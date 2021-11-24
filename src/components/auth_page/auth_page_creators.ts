import loginTemplate from './login.handlebars';
import registerTemplate from './register.handlebars';
import './auth.scss';

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

	console.log(grandparent.innerHTML);
	return grandparent.innerHTML;
};

const registerHTML = (): string => {
	const parent = document.createElement('div');

	const formPlace: HTMLDivElement = document.createElement('div');
	formPlace.id = 'form_place';
	formPlace.classList.add('frame');
	formPlace.classList.add('form_place');

	const textPlace: HTMLDivElement = document.createElement('div');
	textPlace.id = 'text_place';
	textPlace.classList.add('frame');
	textPlace.classList.add('text_place');
	textPlace.innerHTML = registerTemplate();

	parent.appendChild(formPlace);
	parent.appendChild(textPlace);

	parent.classList.add('auth_page');

	const grandparent = document.createElement('div');
	grandparent.appendChild(parent);

	console.log(grandparent.innerHTML);
	return grandparent.innerHTML;
};

export { loginHTML, registerHTML };
