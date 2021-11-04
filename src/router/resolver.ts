import { DataType, IEvent } from '@/dispatcher';
import {
	newInitPageRequest,
	initLoginPageRequest,
	initRegisterPageRequest,
	initSightPageRequest,
	initTripPageRequest,
	initErrorPageRequest,
	initCountryPageRequest,
} from '@/actions';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';

const pathErrorEvent: IEvent = initErrorPageRequest(new Error('Неверная ссылка'));

const tryGetIdParam = (path: URL, event: (data: string) => IEvent): IEvent => {
	const id = path.searchParams.get(paramsURLfrontend.id);
	console.log("id : ", id);
	if (id === null) {
		return pathErrorEvent;
	}
	return event(id);
};

export const resolve = (path: URL): IEvent => {
	console.log('path :', path);

	switch (path.pathname) {
		case pathsURLfrontend.root: {
			return newInitPageRequest();
		}
		case pathsURLfrontend.country: {
			return tryGetIdParam(path, initCountryPageRequest);
		}
		case pathsURLfrontend.trip: {
			return tryGetIdParam(path, initTripPageRequest);
		}
		case pathsURLfrontend.login: {
			return initLoginPageRequest();
		}
		case pathsURLfrontend.register: {
			return initRegisterPageRequest();
		}
		case pathsURLfrontend.sight: {
			return tryGetIdParam(path, initSightPageRequest);
		}
		default:
			return pathErrorEvent;
	}
};
