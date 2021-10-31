import { PageReducer, HeaderReducer } from './reducers';
import HeaderView from './view/header';
import { router } from './router';

import './index.css';
import './drop_default.css';

const main = () => {
	console.log(window.location.pathname);

	const contentPlace: HTMLDivElement = document.createElement('div');
	contentPlace.id = 'content';
	const pageReducer: PageReducer = new PageReducer(contentPlace);
	pageReducer.init();

	const headerPlace: HTMLDivElement = document.createElement('div');
	headerPlace.id = 'header';
	const headerReducer: HeaderReducer = new HeaderReducer();
	headerReducer.init();

	const headerView: HeaderView = new HeaderView(headerPlace);
	headerView.init();

	const root = document.getElementById('root');

	if (root !== null) {
		root.appendChild(headerPlace);
		root.appendChild(contentPlace);
	}

	router.start();
};

main();

/**
 * Функция отображает в html "главную страницу" со списком достопримечательностей и двумя кнопками
 */
// const generateMainPage = (): void => {
//     const root: HTMLElement | null = document.getElementById('root');
//     if (root === null) {
//         console.log("root null")
//         return;
//     }
//     // root.innerHTML += headerHTML();
//     // root.innerHTML += innerHTML();
//     // root.innerHTML += footerHTML();
//     //
//     // chooseHeaderType();
//     const storage: Storage = new Storage();
//     const dispatcher: Dispatcher = new Dispatcher();
//     const pageReducer: PageReducer = new PageReducer(storage, dispatcher);
//     pageReducer.init();
//
//     dispatcher.notify(newInitPageRequest());
//
//     // const shower = new Shower(dispatcher);
//     // shower.showNext();
//     //
//     // const btnExit = new Button();
//     // btnExit.makeButton(
//     //     'Следующая страна',
//     //     'left-side-btn',
//     //     'btn-next-country',
//     //     document.getElementById('root')
//     // );
//     // btnExit.addClickListener(() => shower.showNext());
//     // btnExit.setActive();
// };
//
// generateMainPage();
