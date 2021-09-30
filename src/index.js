import {
	showCountrySights,
	showRussia,
	headerHTML,
	chooseHeaderType,
	footerHTML,
	innerHTML,
} from './forms/index.js';
import { Button } from './components/index.js';

/**
 * Надеюсь этот код никто никогда не увидит
 */
const callOnce = () => {
	let counter = 0;
	return () => {
		if (counter < 1) {
			const btnLogo = new Button(document.getElementById('click-logo'));
			btnLogo.addClickListener(showRussia);
			btnLogo.setActive();
		}
		counter = 1;
	};
};

/**
 * Функция отображает в html "главную страницу" со списком достопримечательностей и двумя кнопками
 */
window.onload = () => {
	const root = document.getElementById('root');
	root.innerHTML += headerHTML();
	root.innerHTML += innerHTML();
	root.innerHTML += footerHTML();

	chooseHeaderType();

	showCountrySights();
	const btnNext = new Button();
	btnNext.makeButton('Следующая страна', 'left-side-btn', 'btn-next-country', root);
	btnNext.addClickListener(showCountrySights);
	btnNext.setActive();

	const makeLogo = callOnce();
	window.onmousemove = () => makeLogo();
};
