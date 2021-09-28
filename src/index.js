import { showCountrySights, headerHTML, setAuthToHeader, footerHTML, innerHTML } from './forms';

/**
 * Функция отображает в html "главную страницу" со списком достопримечательностей и двумя кнопками
 */
const generateMainPage = () => {
	const root = document.getElementById('root');
	root.innerHTML += headerHTML();
	root.innerHTML += innerHTML();
	root.innerHTML += footerHTML();

	setAuthToHeader();

	showCountrySights();
};

generateMainPage();
