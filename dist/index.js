"use strict";
// import {
//     Shower,
//     headerHTML,
//     chooseHeaderType,
//     footerHTML,
//     innerHTML,
// } from './forms/index';
// import {Button} from './components/index';
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./storage/index");
const index_2 = require("./dispatcher/index");
const index_3 = require("./reducers/index");
const index_4 = require("./actions/index");
/**
 * Функция отображает в html "главную страницу" со списком достопримечательностей и двумя кнопками
 */
const generateMainPage = () => {
    const root = document.getElementById('root');
    if (root === null) {
        console.log("root null");
        return;
    }
    // root.innerHTML += headerHTML();
    // root.innerHTML += innerHTML();
    // root.innerHTML += footerHTML();
    //
    // chooseHeaderType();
    let storage = new index_1.Storage();
    let dispatcher = new index_2.Dispatcher();
    let pageReducer = new index_3.PageReducer(storage, dispatcher);
    pageReducer.init();
    dispatcher.notify((0, index_4.newInitPageRequest)());
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
