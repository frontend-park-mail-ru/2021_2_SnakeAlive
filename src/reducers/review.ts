import { HttpError, sendDeleteJSONRequest, sendGetJSONRequest, sendPostJSONRequest } from '@/http';
import { backendEndpoint, profile, queryParamsToGetReview, reviewsURI, reviewURI } from '@/constants';
import { createReviewForm, newGetReviewsRequest, newGetReviewsResponse } from '@/actions/review';
import { initErrorPageRequest } from '@/actions/page';
import { storage } from '@/storage';
import { CreateReview, DataType, dispatcher, EventType, NumID, Token } from '@/dispatcher';
import { CreateReviewRequest, CreateReviewResponse, Review } from '@/models/review';
import {
	adaptCreateReviewRequest,
	adaptCreateReviewResponse, adoptGotReview,
	adoptReviewBeforePost, ReviewGotInfo,
} from '@/adapters/review';
import { CreateReviewForm } from '@/dispatcher/metadata_types';
import { GotProfileResponse } from '@/adapters/header';
import { newSetMainHeaderBasicResponse, newSetMainHeaderLoggedResponse } from '@/actions/header';
import { adaptGetProfileResponse } from '@/adapters/profile';

export default class ReviewReducer {
	#tokens: Token[];

	#placeId = -1;

	constructor() {
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_REVIEWS_REQUEST, this.getReviews),
			dispatcher.register(EventType.DELETE_REVIEW_REQUEST, this.deleteReview),
			// dispatcher.register(EventType.CREATE_REVIEW_REQUEST, this.createReview),
			dispatcher.register(EventType.CREATE_REVIEW_FORM_RESPONSE, this.createReview),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = (metadata: DataType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	getReviews = (metadata: DataType): void => {
		const event = <NumID>metadata;
		this.#placeId = event.ID;

		this.#putUserToStorage()
			.then((data: GotProfileResponse | number) => {
				if (typeof data !== 'number') {
					storage.storeProfile(adaptGetProfileResponse(data));
					dispatcher.notify(newSetMainHeaderLoggedResponse());
				}

				dispatcher.notify(newSetMainHeaderBasicResponse());

				this.#sendGetReviews(event.ID)
					.then((reviews: ReviewGotInfo[]) => {
						storage.storeReviews(adoptGotReview(reviews));
						dispatcher.notify(newGetReviewsResponse());
					})
					.catch((error: Error) => {
						console.log(error);
					});
			})
	};

	deleteReview = (metadata: DataType): void => {
		const event = <NumID>metadata;
		this.#sendDeleteReview(event.ID)
			.then(response => {
				if (response.ok) {
					dispatcher.notify(newGetReviewsRequest(this.#placeId));
				}
			})
			.catch((error: Error) => {
				dispatcher.notify(initErrorPageRequest(error));
			});
	};

	createReview = (metadata: CreateReviewForm): void => {
		const event = <CreateReview>metadata;
		event.placeId = Number(storage.getSight().id);
		this.#sendCreateReview(adaptCreateReviewRequest(event))
			.then((responseText: string) => {
				console.log(responseText);
				dispatcher.notify(createReviewForm());
				dispatcher.notify(newGetReviewsRequest(this.#placeId));
				// надо добавлять а не ререндить всех но что поделать
				// как бы надо проверять ок/не ок ответ пришел, ноо мы этого не делаем
				// все равно только по обновлению работает. починить если останется время
			})
			.catch((error: Error) => {
				console.log('something went wrong during POST /review', error);
			});
	};

	#sendGetReviews = (sightID: number): Promise<ReviewGotInfo[]> =>
		sendGetJSONRequest(backendEndpoint + reviewsURI + sightID + queryParamsToGetReview)
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('На сайте нет такой страницы'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('Нужно войти в систему'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.json());

	#sendDeleteReview = (reviewID: number): Promise<Response> =>
		sendDeleteJSONRequest(backendEndpoint + reviewsURI + reviewID).then(response => {
			if (response.status === 404) {
				return Promise.reject(new Error('На сайте нет такой страницы'));
			}
			if (response.status === 401) {
				return Promise.reject(new Error('Нужно войти в систему'));
			}
			return Promise.resolve(response);
		});

	#sendCreateReview = (request: CreateReviewRequest): Promise<string> =>
		sendPostJSONRequest(backendEndpoint + reviewURI, adoptReviewBeforePost(request))
			.then(response => {
				if (response.status === 404) {
					return Promise.reject(new Error('На сайте нет такой страницы'));
				}
				if (response.status === 401) {
					return Promise.reject(new Error('Нужно войти в систему'));
				}
				return Promise.resolve(response);
			})
			.then(response => response.text());

	#putUserToStorage = (): Promise<GotProfileResponse | number> =>
		sendGetJSONRequest(backendEndpoint + profile)
			.then(response => {
				if (response.status === 401) {
					return response.status;
				}
				return response.json();
			});
}
