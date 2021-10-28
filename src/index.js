import {
	Shower,
	headerHTML,
	chooseHeaderType,
	footerHTML,
	innerHTML,
} from './forms/index.js';
import { Button } from './components/index.js';

import {Storage} from "./storage/index.js";
import {Dispatcher} from "./dispatcher/index.js";
import {PageReducer} from './reducers/index.js'
import {newInitPageRequest} from "./actions/index.js";

/**
 * Функция отображает в html "главную страницу" со списком достопримечательностей и двумя кнопками
 */
const generateMainPage = () => {
	const root = document.getElementById('root');
	root.innerHTML += headerHTML();
	root.innerHTML += innerHTML();
	root.innerHTML += footerHTML();

	chooseHeaderType();
	let storage = new Storage();
	let dispatcher = new Dispatcher();
	let pageReducer = new PageReducer(dispatcher, storage);
	pageReducer.init();

	dispatcher.notify(newInitPageRequest());

	const shower = new Shower(dispatcher);
	shower.showNext();

	const btnExit = new Button();
	btnExit.makeButton(
		'Следующая страна',
		'left-side-btn',
		'btn-next-country',
		document.getElementById('root')
	);
	btnExit.addClickListener(() => shower.showNext());
	btnExit.setActive();
};

generateMainPage();
