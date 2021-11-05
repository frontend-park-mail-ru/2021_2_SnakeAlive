import {DataType, IEvent} from '@/dispatcher';
import {
    newInitPageRequest,
    initLoginPageRequest,
    initRegisterPageRequest,
    initSightPageRequest,
    initTripPageRequest,
    initErrorPageRequest,
    initCountryPageRequest, newInitCountryRequest, initProfilePageRequest, newGetProfileRequest, newGetReviewsRequest,
} from '@/actions';
import {paramsURLfrontend, pathsURLfrontend} from '@/constants';
import {dispatcher} from '@/dispatcher';

const pathErrorEvent: IEvent = initErrorPageRequest(new Error('Неверная ссылка'));

const tryGetIdParam = (path: URL, initEvent: () => IEvent, event: (data: string) => IEvent): void /* IEvent */ => {
    const id = path.searchParams.get(paramsURLfrontend.id);
    console.log('id : ', id);
    if (id === null) {
        dispatcher.notify(pathErrorEvent);
        return;
    }

};

const getIDParam = (path: URL): number | null => {
    return path.searchParams.get(paramsURLfrontend.id) as number | null;
}

const getIDParamDispatchError = (path: URL): number | null => {
    const id: number | null = getIDParam(path);

    console.log('id : ', id);
    if (id === null) {
        dispatcher.notify(pathErrorEvent);
    }

    return id;
}

export const notifier = (path: URL): void /* IEvent */ => {
    console.log('path :', path);

    switch (path.pathname) {
        case pathsURLfrontend.root: {
            dispatcher.notify(newInitPageRequest());
            dispatcher.notify(newInitCountryRequest('russia', '0'));
            break;
        }
        case pathsURLfrontend.country: {
            tryGetIdParam(path, initCountryPageRequest, newInitPageRequest);
            break;
        }
        // case pathsURLfrontend.trip: {
        // 	return tryGetIdParam(path, initTripPageRequest);
        // 	break;
        // }
        case pathsURLfrontend.profile: {
            dispatcher.notify(initProfilePageRequest())
            dispatcher.notify(newGetProfileRequest())
            break
        }
        case pathsURLfrontend.login: {
            dispatcher.notify(initLoginPageRequest());
            break;
        }
        // case pathsURLfrontend.register: {
        // 	return initRegisterPageRequest();
        // 	break;
        // }

        case pathsURLfrontend.sight: {
        	// tryGetIdParam(path, initSightPageRequest);
            const id: number | null = getIDParamDispatchError(path)
            if(id == null) {
                break;
            }

            dispatcher.notify(initSightPageRequest(String(id)));
            dispatcher.notify(newGetReviewsRequest(id));
        	break;
        }
        default:
            dispatcher.notify(pathErrorEvent);
    }
    return;
};
