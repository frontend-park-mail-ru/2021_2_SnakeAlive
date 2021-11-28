import { dispatcher, EventType, IEvent } from '@/dispatcher';
import {
	initAlbumPageRequest,
	initErrorPageRequest,
	initLoginPageRequest,
	initProfilePageRequest,
	initRegisterPageRequest,
	initSightPageRequest, initTagPageRequest,
	initTripPageRequest,
	newInitPageRequest,
	initTripEditPageRequest,
} from '@/actions/page';
import { createTripFormRequest, newGetTripRequest } from '@/actions/trip';
import { newGetProfileRequest } from '@/actions/profile';
import { showLoginForm, showRegisterForm } from '@/actions/auth';
import { newGetReviewsRequest } from '@/actions/review';
import { newGetSightRequest } from '@/actions/sight';
import { newInitCountryRequest } from '@/actions/country';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { createAlbumFormRequest, newGetAlbumRequest } from '@/actions/album';
import { newTagRequest } from '@/actions/tag';

const pathErrorEvent: IEvent = initErrorPageRequest(new Error('Неверная ссылка'));

const tryGetParam = (params: paramsURLfrontend[], path: URL): Record<string, string> => {
	const res: Record<string, string> = {};

	let gotParam: string | null;
	params.forEach((param: paramsURLfrontend) => {
		gotParam = path.searchParams.get(param);
		if (gotParam) {
			res[param] = gotParam;
		}
	});
	console.log(res, 'res');
	return res;
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
			dispatcher.notify(newInitCountryRequest('Russia', '1'));
			break;
		}
		case pathsURLfrontend.country: {
			console.log('country');
			dispatcher.notify(newInitPageRequest());
			const params = tryGetParam([paramsURLfrontend.id], path);
			if (params.id) {
				dispatcher.notify(newInitCountryRequest(params.id, params.id));
			} else {
				dispatcher.notify(initErrorPageRequest(Error('эта страна не поддерживается')));
			}
			break;
		}
		case pathsURLfrontend.trip: {
			const params = tryGetParam([paramsURLfrontend.id, paramsURLfrontend.edit], path);
			console.log(params);

			
			if (params.id) {
				dispatcher.notify(initTripEditPageRequest(Number(params.id)));
			} else {
				dispatcher.notify(initTripPageRequest());
			}
			// if (params.id) {
			// 	if (params.edit === '1') {
			// 		dispatcher.notify(newGetTripRequest(params.id, true));
			// 	} else {
			// 		dispatcher.notify(newGetTripRequest(params.id, false));
			// 	}
			// } else {
			// 	dispatcher.notify(createTripFormRequest());
			// }
			//dispatcher.notify(createTripFormRequest())
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
		case pathsURLfrontend.album: {
			const params = tryGetParam([paramsURLfrontend.id, paramsURLfrontend.edit], path);

			dispatcher.notify(initAlbumPageRequest());
			if (params.id) {
				if (params.edit === '1') {
					dispatcher.notify(newGetAlbumRequest(params.id, true));
				} else {
					dispatcher.notify(newGetAlbumRequest(params.id, false));
				}
			} else {
				dispatcher.notify(createAlbumFormRequest());
			}
			break;
		}
		case pathsURLfrontend.tag: {
			const params = tryGetParam([paramsURLfrontend.tag], path);
			if (params.tag) {
				dispatcher.notify(initTagPageRequest());
				console.log(params.tag);
				dispatcher.notify(newTagRequest(params.tag));
			} else {
				dispatcher.notify(initErrorPageRequest(Error('эта страна не поддерживается')));
			}
			break;
		}
		default:
			dispatcher.notify(pathErrorEvent);
	}
};
