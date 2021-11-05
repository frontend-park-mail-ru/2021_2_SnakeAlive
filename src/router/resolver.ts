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
} from '@/actions';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';

const pathErrorEvent: IEvent = initErrorPageRequest(new Error('Неверная ссылка'));

const tryGetIdParam = (
	path: URL,
	initEvent: () => IEvent,
	event: any // => IEvent
): void /* IEvent */ => {
	const id = path.searchParams.get(paramsURLfrontend.id);
	console.log('id : ', id);
	if (id === null) {
		dispatcher.notify(pathErrorEvent);
		return;
	}
	dispatcher.notify(initEvent());
	dispatcher.notify(event(id));
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
			dispatcher.notify(newInitCountryRequest('russia', 'russia'));
			break;
		}
		case pathsURLfrontend.country: {
			tryGetIdParam(path, newInitPageRequest, newInitCountryRequest);
			break;
		}
		case pathsURLfrontend.trip: {
			tryGetIdParam(path, initTripPageRequest, newGetTripRequest);
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
		// case pathsURLfrontend.register: {
		// 	return initRegisterPageRequest();
		// 	break;
		// }
		// case pathsURLfrontend.sight: {
		// 	tryGetIdParam(path, initSightPageRequest, newGetSightRequest);
		// 	break;
		// }
		case pathsURLfrontend.sight: {
			// tryGetIdParam(path, initSightPageRequest);
			const id: number | null = getIDParamDispatchError(path);
			if (id == null) {
				break;
			}

			dispatcher.notify(initSightPageRequest());
			dispatcher.notify(newGetReviewsRequest(id));
			break;
		}
		default:
			dispatcher.notify(pathErrorEvent);
	}
};
