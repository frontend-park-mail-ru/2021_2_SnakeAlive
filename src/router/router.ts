import { resolve } from './resolver';
import { dispatcher } from '@/dispatcher';

class Router {
	start = (_data?: object) => {
		const url = new URL(window.location.href); // это встроенный класс
		const event = resolve(url);
		dispatcher.notify(event);
	};

	go = (_path: string, _data?: object) => {
		if (window.location.pathname === _path) return;
		const url = new URL(_path, window.location.href);
		const event = resolve(url);
		this.#pushHistoryState(_path, _data);
		dispatcher.notify(event);
	};

	popstate = (): void => {
		const url = new URL(window.location.href);
		const event = resolve(url);
		if (event !== undefined) {
			dispatcher.notify(event);
		}
	};

	#pushHistoryState = (_path: string, _data?: object): void => {
		window.history.pushState(_data, _path, _path);
	};
}

export const router = new Router();
