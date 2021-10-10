import {
	showCountrySights,
	headerHTML,
	chooseHeaderType,
	footerHTML,
	innerHTML,
} from './forms/index.js';
import { Button } from './components/index.js';

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
};
