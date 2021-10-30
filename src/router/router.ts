import { resolve } from './resolver';
import { dispatcher } from '../dispatcher';

class Router {
	start = (_data?: object) => {
		const event = resolve(window.location.pathname);
		if (event !== undefined) {
			dispatcher.notify(event);
		}
	};

	go = (_path: string, _data: object) => {
		if (window.location.pathname === _path) return;
		const event = resolve(_path);
		if (event !== undefined) {
			this.#pushHistoryState(_path, _data);
			dispatcher.notify(event);
		}
	};

	popstate = (): void => {
		const event = resolve(window.location.pathname);
		if (event !== undefined) {
			dispatcher.notify(event);
		}
	};

	#pushHistoryState = (_path: string, _data: object): void => {
		window.history.pushState(_data, _path, _path);
	};
}

export const router = new Router();
