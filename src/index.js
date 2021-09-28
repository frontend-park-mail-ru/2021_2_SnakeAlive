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

// window.onresize = ( event ) => {
// 	const width = window.screen.availWidth;
// 	if ( width < 500 ) {
//
// 	}
// 	if ( width > 1000 )
// };

// <script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.runtime.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>