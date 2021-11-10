import { DataType, dispatcher, IEvent } from '@/dispatcher';
import {
	newInitPageRequest,
	initLoginPageRequest,
	initRegisterPageRequest,
	initSightPageRequest,
	initTripPageRequest,
	initErrorPageRequest,
	initCountryPageRequest,
	newInitCountryRequest,
	showLoginForm,
	newGetSightRequest,
	newGetTripRequest,
	initProfilePageRequest,
	newGetProfileRequest,
	newGetReviewsRequest,
	createTripFormRequest,
	showRegisterForm,
} from '@/actions';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { storage } from '@/storage';

const pathErrorEvent: IEvent = initErrorPageRequest(new Error('Неверная ссылка'));

const tryGetParam = (
	param: paramsURLfrontend,
	path: URL,
	initEvent: () => IEvent,
	event: any // => IEvent
): void /* IEvent */ => {
	const id = path.searchParams.get(param);
	if (id === null) {
		dispatcher.notify(pathErrorEvent);
		return;
	}
	dispatcher.notify(initEvent());
	dispatcher.notify(event(id, id)); // второй раз это на самом деле name, для страны, не убирать
};

const getIDParam = (path: URL): number | null =>
	path.searchParams.get(paramsURLfrontend.id) as number | null;

const getIDParamDispatchError = (path: URL): number | null => {
	const id: number | null = getIDParam(path);

	console.log('id : ', id);
	if (id === null) {
		dispatcher.notify(pathErrorEvent);
	}

	return id;
};

export const notifier = (path: URL): void /* IEvent */ => {
	console.log('path :', path);

	switch (path.pathname) {
		case pathsURLfrontend.root: {
			dispatcher.notify(newInitPageRequest());
			dispatcher.notify(newInitCountryRequest('Russia', 'Russia'));
			break;
		}
		case pathsURLfrontend.country: {
			tryGetParam(paramsURLfrontend.name, path, newInitPageRequest, newInitCountryRequest);
			break;
		}
		case pathsURLfrontend.trip: {
			const id: number | null = getIDParam(path);
			if (id === null) {
				dispatcher.notify(initTripPageRequest());
				dispatcher.notify(createTripFormRequest());
			} else {
				tryGetParam(paramsURLfrontend.id, path, initTripPageRequest, newGetTripRequest);
				storage.addLastTripId(id);
			}

			break;
		}
		case pathsURLfrontend.login: {
			dispatcher.notify(initLoginPageRequest());
			dispatcher.notify(showLoginForm());
			break;
		}
		case pathsURLfrontend.profile: {
			dispatcher.notify(initProfilePageRequest());
			dispatcher.notify(newGetProfileRequest());
			break;
		}
		case pathsURLfrontend.register: {
			dispatcher.notify(initRegisterPageRequest());
			dispatcher.notify(showRegisterForm());
			break;
		}
		case pathsURLfrontend.sight: {
			const id: number | null = getIDParamDispatchError(path);
			if (id == null) {
				break;
			}

			dispatcher.notify(initSightPageRequest());
			dispatcher.notify(newGetSightRequest(String(id)));
			dispatcher.notify(newGetReviewsRequest(id));
			break;
		}
		default:
			dispatcher.notify(pathErrorEvent);
	}
};
