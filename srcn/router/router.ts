import { resolve } from "./resolver";
import {
    Login,
    // Register,
    // List

} from '../view/login'

class Router {
    start = (_path: string, _data?: object) => {
        if (resolve(_path)) {
            const view = resolve(_path);
            Router.#changeToView(view);
        }
    }

    go = (_path: string, _data: object) => {
        if (window.location.pathname === _path) return;
        const view = resolve(_path)
        if (view !== undefined) {
            this.#pushHistoryState(_path, _data);
            Router.#changeToView(view);
        }
    };

    popstate = (): void => {
        const view = resolve(window.location.pathname);
        if (view !== undefined) {
            Router.#changeToView(view);
        }
    }

    #pushHistoryState = (_path: string, _data: object): void => {
        window.history.pushState(_data, _path, _path)
    }

    static #changeToView = (View: Login): void => {
        const page = document.getElementById("page");
        if(page !== null && page.parentNode !== null){
            page.parentNode.removeChild(page);
        }
        const v = new View();
    }
};

export const router = new Router()
