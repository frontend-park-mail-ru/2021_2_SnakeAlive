import { PageReducer, HeaderReducer } from './reducers';
import HeaderView from './view/header';
import { router } from './router';

import './drop_default.css';
import './index.scss';

import './components/horizontal_scroll/horizontal_scroll.scss';

import SearchReducer from '@/reducers/search';

const main = () => {
	const contentPlace: HTMLDivElement = document.createElement('div');
	contentPlace.id = 'content';
	contentPlace.classList.add('content');
	const pageReducer: PageReducer = new PageReducer();
	pageReducer.init();

	const headerPlace: HTMLDivElement = document.createElement('div');
	headerPlace.id = 'header';
	headerPlace.classList.add('header');
	const headerReducer: HeaderReducer = new HeaderReducer();
	headerReducer.init();
	const headerView: HeaderView = new HeaderView();
	headerView.init();

	const root = document.getElementById('root');

	if (root !== null) {
		root.appendChild(headerPlace);
		root.appendChild(contentPlace);
	}

	router.start();

	window.onpopstate = () => {
		router.go(window.location.href);
	};

	const searchReducer = new SearchReducer();
	searchReducer.init();
};

main();
