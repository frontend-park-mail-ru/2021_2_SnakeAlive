
// import {
//     Shower,
//     headerHTML,
//     chooseHeaderType,
//     footerHTML,
//     innerHTML,
// } from './forms/index';
// import {Button} from './components/index';

import {Storage} from "./storage/index";
import {Dispatcher} from "./dispatcher/index";
import {PageReducer} from './reducers/index'
import {newInitPageRequest} from "./actions/index";

import './index.css';
import './drop_default.css';

/**
 * Функция отображает в html "главную страницу" со списком достопримечательностей и двумя кнопками
 */
const generateMainPage = (): void => {
    const root: HTMLElement | null = document.getElementById('root');
    if (root === null) {
        console.log("root null")
        return;
    }
    // root.innerHTML += headerHTML();
    // root.innerHTML += innerHTML();
    // root.innerHTML += footerHTML();
    //
    // chooseHeaderType();
    let storage: Storage = new Storage();
    let dispatcher: Dispatcher = new Dispatcher();
    let pageReducer: PageReducer = new PageReducer(storage, dispatcher);
    pageReducer.init();

    dispatcher.notify(newInitPageRequest());

    // const shower = new Shower(dispatcher);
    // shower.showNext();
    //
    // const btnExit = new Button();
    // btnExit.makeButton(
    //     'Следующая страна',
    //     'left-side-btn',
    //     'btn-next-country',
    //     document.getElementById('root')
    // );
    // btnExit.addClickListener(() => shower.showNext());
    // btnExit.setActive();
};

generateMainPage();

// import { router } from "./router/index"
//

//
//
//
// router.start(window.location.pathname);
//
// window.addEventListener('popstate', () => {
// 	router.popstate();
// });
