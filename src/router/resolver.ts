// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Loader } from '@googlemaps/js-api-loader';
import { dispatcher, IEvent } from '@/dispatcher';
import {
	initAlbumPageRequest,
	initErrorPageRequest,
	initLoginPageRequest,
	initProfilePageRequest,
	initRegisterPageRequest,
	initSightPageRequest,
	initTagPageRequest,
	initTripPageRequest,
	newInitPageRequest,
	initTripEditPageRequest,
	initAlienProfileRequest,
	initSearchPageRequest,
} from '@/actions/page';
import { newGetAlienProfileRequest, newGetProfileRequest } from '@/actions/profile';
import { showLoginForm, showRegisterForm } from '@/actions/auth';
import { newGetReviewsRequest } from '@/actions/review';
import { newGetSightRequest } from '@/actions/sight';
import { newInitCountryRequest } from '@/actions/country';
import { frontEndEndPoint, paramsURLfrontend, pathsURLfrontend } from '@/constants';
import { createAlbumFormRequest, newGetAlbumRequest } from '@/actions/album';
import { newTagRequest } from '@/actions/tag';
import { initEmptySearchPageRequest } from '@/actions/search';
import { createFrontendQueryParams, router } from '@/router/router';

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
	return res;
};

const getIDParam = (path: URL): number | null =>
	path.searchParams.get(paramsURLfrontend.id) as number | null;

const getIDParamDispatchError = (path: URL): number | null => {
	const id: number | null = getIDParam(path);

	if (id === null) {
		dispatcher.notify(pathErrorEvent);
	}

	return id;
};

const getTripIdBackEnd = (str: string): string => {
	const array = str.split('/');
	return array[array.length - 1];
}

export const notifier = (path: URL): void /* IEvent */ => {
	if (/api\/trip\/[0-9]+/.test(path.pathname)) {
		// перенаправление на поездку в случае успешного перенаправления беком
		const tripId = getTripIdBackEnd(path.pathname);
		window.location.href = createFrontendQueryParams(pathsURLfrontend.trip, [
			{
				key: paramsURLfrontend.id,
				value: tripId,
			},
		]);
		// eslint-disable-next-line no-param-reassign
		path = new URL(window.location.href);
	} else if (/\/api\/trip\/share\//.test(path.pathname)) {
		// предполагаем, что если фронт пытается обработать такой путь, значит уже что-то не так
		window.location.href = '/';
		// eslint-disable-next-line no-param-reassign
		path = new URL(window.location.href);
	}

	switch (path.pathname) {
		case pathsURLfrontend.root: {
			dispatcher.notify(newInitPageRequest());
			dispatcher.notify(newInitCountryRequest('Russia', '1'));
			break;
		}
		case pathsURLfrontend.country: {
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

			if (params.id) {
				dispatcher.notify(initTripEditPageRequest(Number(params.id)));
			} else {
				dispatcher.notify(initTripPageRequest());
			}
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
				dispatcher.notify(newTagRequest(params.tag));
			} else {
				dispatcher.notify(initErrorPageRequest(Error('нет такого тега')));
			}
			break;
		}
		// /user?id=3
		case pathsURLfrontend.users: {
			const params = tryGetParam([paramsURLfrontend.id], path);
			if (params.id) {
				dispatcher.notify(initAlienProfileRequest());
				dispatcher.notify(newGetAlienProfileRequest(params.id));
			} else {
				dispatcher.notify(initErrorPageRequest(Error('Кто это? Нет такого пользователя')));
			}
			break;
		}
		case pathsURLfrontend.search: {
			dispatcher.notify(initSearchPageRequest());
			dispatcher.notify(initEmptySearchPageRequest());
			break;
		}
		default:
			dispatcher.notify(pathErrorEvent);
	}
};
