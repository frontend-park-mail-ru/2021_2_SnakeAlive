import { resolve } from "./resolver";

class Router {
    start = (_path: string, _data?: object) => {
        const view = resolve(_path);
        if (view !== undefined) {
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

    static #changeToView = (view: object): void => {
        const page = document.getElementById("page");
        if(page !== null && page.parentNode !== null){
            page.parentNode.removeChild(page);
        }
        // @ts-ignore
        const v = new view();
    }
};

export const router = new Router()
