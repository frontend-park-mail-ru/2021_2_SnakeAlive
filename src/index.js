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
const generateMainPage = () => {
	const root = document.getElementById('root');
	root.innerHTML += headerHTML();
	root.innerHTML += innerHTML();
	root.innerHTML += footerHTML();

	chooseHeaderType();

	showCountrySights();
	const btnExit = new Button();
	btnExit.makeButton(
		'Следующая страна',
		'left-side-btn',
		'btn-next-country',
		document.getElementById('root')
	);
	btnExit.addClickListener(() => showCountrySights());
	btnExit.setActive();
};

generateMainPage();
