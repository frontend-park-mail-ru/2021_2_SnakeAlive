import { notifier } from './resolver';
import { frontEndEndPoint, paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { dispatcher } from '@/dispatcher';
import { destroyCurrentPage } from '@/actions/page';
import ErrorView from '@/view/error';

export const createFrontendQueryParams = (
	uri: pathsURLfrontend,
	params: { key: paramsURLfrontend; value: string }[]
): string => {
	const url = new URL(frontEndEndPoint + uri);
	params.forEach(param => {
		url.searchParams.set(param.key, param.value);
	});
	return url.href;
};

const checkIfOnline = (): boolean => {
	console.log(navigator.onLine);
	if (navigator.onLine) {
		return true;
	}
	dispatcher.notify(destroyCurrentPage());
	const errorView: ErrorView = new ErrorView();
	errorView.initOffline();
	return false;
};

class Router {
	start = () => {
		console.log('router START', window.location.href);
		if (!checkIfOnline()) {
			console.log('offline');
			return;
		}
		console.log('online');

		const url = new URL(window.location.href); // это встроенный класс
		notifier(url);

		window.onpopstate = () => {
			this.go(window.location.href);
		};
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
	popstate = (): void => {
		window.history.back();
		const url = new URL(window.location.href);
		notifier(url);
	};

	pushHistoryState = (_path: string, _data?: object): void => {
		window.history.pushState(_data, _path, _path);
	};

	#pushHistoryState = (_path: string, _data?: object): void => {
		window.history.pushState(_data, _path, _path);
	};
}

export const router = new Router();
