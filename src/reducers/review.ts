import { sendDeleteJSONRequest, sendGetJSONRequest, sendPostJSONRequest } from '@/http';
import {
	backendEndpoint,
	profile,
	queryParamsToGetReview,
	reviewsURI,
	reviewURI,
} from '@/constants';
import { createReviewForm, newGetReviewsRequest, newGetReviewsResponse } from '@/actions/review';
import { initErrorPageRequest } from '@/actions/page';
import { storage } from '@/storage';
import { CreateReview, DataType, dispatcher, EventType, NumID, Token } from '@/dispatcher';
import { CreateReviewRequest, UserReview } from '@/models/review';
import {
	adaptCreateReviewRequest,
	adoptGotReview,
	adoptReviewBeforePost,
	ReviewGotInfo,
} from '@/adapters/review';
import { CreateReviewForm } from '@/dispatcher/metadata_types';
import { GotProfileResponse } from '@/adapters/header';
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
			dispatcher.register(EventType.CREATE_REVIEW_FORM_RESPONSE, this.createReview),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});
	};

	getReviews = (metadata: DataType): void => {
		const event = <NumID>metadata;
		this.#placeId = event.ID;

		this.#putUserToStorage().then((gotProfile: GotProfileResponse | number) => {
			if (typeof gotProfile !== 'number') {
				storage.storeProfile(adaptGetProfileResponse(gotProfile));
			}
			this.#sendGetReviews(event.ID).then((reviews: ReviewGotInfo[]) => {
				// const users = this.#getReviewsUsers(reviews);
				const users: UserReview[] = [];
				if (reviews) {
					users.length = reviews.length;
				}

				storage.storeReviews(adoptGotReview(reviews, users));
				dispatcher.notify(newGetReviewsResponse());
			});
		});
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
			.then(() => {
				dispatcher.notify(createReviewForm());
				dispatcher.notify(newGetReviewsRequest(this.#placeId));
				// надо добавлять а не ререндить всех но что поделать
				// как бы надо проверять ок/не ок ответ пришел, ноо мы этого не делаем
				// все равно только по обновлению работает. починить если останется время
			})
			.catch((/* error: Error */) => {
				// console.log('something went wrong during POST /review', error);
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
		sendGetJSONRequest(backendEndpoint + profile).then(response => {
			if (response.status === 401) {
				return response.status;
			}
			return response.json();
		});

	// #getReviewsUsers = (reviews: ReviewGotInfo[]): UserReview[] => {
	// 	const amount = reviews.length;
	// 	const res: UserReview[] = [];
	//
	// 	reviews.forEach(review => sendGetJSONRequest(backendEndpoint + userURI + review.id)
	// 			.then((response: Response) => {
	// 				if (response.status === 200) {
	// 					return Promise.resolve(response);
	// 				}
	// 				return Promise.reject(new Error(`got user with error ${response.status}`));
	// 			})
	// 			.then(user => user.json())
	// 		// eslint-disable-next-line consistent-return
	// 			.then((user: UserReview) => {
	// 				res.push(user);
	// 				if (res.length === amount) {
	// 					return res;
	// 				}
	// 			})
	// 			.catch(err => console.log(err)));
	// }
}
