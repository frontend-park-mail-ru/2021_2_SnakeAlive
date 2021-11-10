import { notifier } from './resolver';
import { dispatcher, UUID } from '@/dispatcher';
import { frontEndEndPoint, paramsURLfrontend, pathsURLfrontend } from '@/constants';

export const createFrontendQueryParams = (
	uri: pathsURLfrontend,
	paramName: paramsURLfrontend,
	idOrName: string
): string => {
	const url = new URL(frontEndEndPoint + uri);
	url.searchParams.set(paramName, idOrName);
	// console.log("madeUrl: ", url);
	return url.href;
};

class Router {
	start = (_data?: object) => {
		const url = new URL(window.location.href); // это встроенный класс
		notifier(url);
	};

	go = (_path: string, _data?: string) => {
		const testQ = new URL(window.location.href);
		if (window.location.pathname === _path && testQ.searchParams.toString() === '') return;
		const url = new URL(_path, window.location.href);
		if (_data) {
			url.searchParams.append('id', _data);
		}
		notifier(url);
		this.#pushHistoryState(_path, { _data });
	};

	// нужен если на странице делать кнопку назад
	// popstate = (): void => {
	// 	window.history.back();
	// 	const url = new URL(window.location.href);
	// 	notifier(url);
	// };

	#pushHistoryState = (_path: string, _data?: object): void => {
		window.history.pushState(_data, _path, _path);
	};
}

export const router = new Router();
