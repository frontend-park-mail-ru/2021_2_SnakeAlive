import { showCountrySights, headerHTML, chooseHeaderType, footerHTML, innerHTML } from './forms/index.js';

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
};

generateMainPage();
