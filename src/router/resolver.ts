import { dispatcher, IEvent } from '@/dispatcher';
import {
	createTripFormRequest,
	initErrorPageRequest,
	initLoginPageRequest,
	initProfilePageRequest,
	initRegisterPageRequest,
	initSightPageRequest,
	initTripPageRequest,
	newGetProfileRequest,
	newGetReviewsRequest,
	newGetSightRequest,
	newGetTripRequest,
	newInitCountryRequest,
	newInitPageRequest,
	showLoginForm,
	showRegisterForm,
} from '@/actions';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { storage } from '@/storage';

const pathErrorEvent: IEvent = initErrorPageRequest(new Error('Неверная ссылка'));

const tryGetParam = (
	params: paramsURLfrontend[],
	path: URL,
	// initEvent: () => IEvent,
	// event: any // => IEvent
): Record<string, string> /* IEvent */ => {
	// const id = path.searchParams.get(param);

	const res: Record<string, string> = {};

	let gotParam: string | null;
	params.forEach((param: paramsURLfrontend) => {
		gotParam = path.searchParams.get(param);
		if (gotParam) {
			res[param] = gotParam;
		}
	})
	console.log(res, "res");
	return res;
	// костыль для обработки редактирования
	// if (res.edit) {
	// 	console.log(res.edit, 'herehere');
	// }
	//
	// console.log(" ", res.edit, res.name, res.edit);
	// dispatcher.notify(initEvent());
	// dispatcher.notify(event(res.id, res.name, res.edit)); // второй раз это на самом деле name, для страны, не убирать
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
	console.log('try to resolve');

	switch (path.pathname) {
		case pathsURLfrontend.root: {
			dispatcher.notify(newInitPageRequest());
			dispatcher.notify(newInitCountryRequest('Russia', 'Russia'));
			// dispatcher.notify(initLoginPageRequest());
			// dispatcher.notify(showLoginForm());
			break;
		}
		case pathsURLfrontend.country: {
			// const params = tryGetParam([paramsURLfrontend.name], path, newInitPageRequest, newInitCountryRequest);
			break;
		}
		case pathsURLfrontend.trip: {
			// const id: number | null = getIDParam(path);
			// if (id === null) {
			// 	dispatcher.notify(initTripPageRequest());
			//
			// } else {
			const params = tryGetParam([paramsURLfrontend.id, paramsURLfrontend.edit], path);
			console.log(params);

			dispatcher.notify(initTripPageRequest());
			if (params.id) {
				if (params.edit === '1') {
					dispatcher.notify(newGetTripRequest(params.id, true));
				} else {
					dispatcher.notify(newGetTripRequest(params.id, false));
				}
			} else {
				dispatcher.notify(createTripFormRequest());
			}


				// ,
				// storage.addLastTripId(id);
			// }

			break;
		}
		case pathsURLfrontend.login: {
			dispatcher.notify(newInitPageRequest());
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
