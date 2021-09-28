import { showCountrySights, headerHTML, chooseHeaderType, footerHTML, innerHTML } from './forms';

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

window.onresize = () => {
	const grid = document.getElementById('card-grid-wrapper');
	const width = document.documentElement.clientWidth;
	if (width < 900) {
		grid.classList.remove('card__grid__3');
		grid.classList.remove('card__grid__2');
		grid.classList.add('card__grid__1');
		return;
	}
	if (width > 1350) {
		grid.classList.remove('card__grid__1');
		grid.classList.remove('card__grid__2');
		grid.classList.add('card__grid__3');
		return;
	}
	grid.classList.remove('card__grid__3');
	grid.classList.remove('card__grid__1');
	grid.classList.add('card__grid__2');
};
