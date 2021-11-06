import { notifier } from './resolver';
import { dispatcher, UUID } from '@/dispatcher';

class Router {
	start = (_data?: object) => {
		const url = new URL(window.location.href); // это встроенный класс
		notifier(url);
	};

	go = (_path: string, _data?: string) => {
		if (window.location.pathname === _path) return;
		const url = new URL(_path, window.location.href);
		if (_data) {
			url.searchParams.append('id', _data);
		}
		notifier(url);
		this.#pushHistoryState(_path, { _data });
	};

	// нужен если на странице делать кнопку назад
	popstate = (): void => {
		const url = new URL(window.location.href);
		const event = notifier(url);
		if (event !== undefined) {
			dispatcher.notify(event);
		}
	};

	#pushHistoryState = (_path: string, _data?: object): void => {
		window.history.pushState(_data, _path, _path);
	};
}

export const router = new Router();
