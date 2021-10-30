// import {
//     Shower,
//     headerHTML,
//     chooseHeaderType,
//     footerHTML,
//     innerHTML,
// } from './forms/index';
// import {Button} from './components/index';

// import {storage} from "./storage/index";
// import {dispatcher} from "./dispatcher/index";
import { PageReducer } from './reducers/index';
// import {newInitPageRequest} from "./actions/index";
import { router } from './router';

import './index.css';
import './drop_default.css';

declare module '*handlebars';

const pageReducer: PageReducer = new PageReducer();
pageReducer.init();

router.start();

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
