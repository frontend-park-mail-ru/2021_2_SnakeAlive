import { sendDeleteJSONRequest, sendGetJSONRequest, sendPostJSONRequest } from '@/http';
import { backendEndpoint, reviewsURI, reviewURI } from '@/constants';
import { initErrorPageRequest, newCreateReviewResponse, newGetReviewsResponse } from '@/actions';
import { storage } from '@/storage';
import { CreateReview, DataType, dispatcher, EventType, NumID, Token } from '@/dispatcher';
import { CreateReviewRequest, CreateReviewResponse, Review } from '@/models/review';
import { adaptCreateReviewRequest, adaptCreateReviewResponse, adoptReviewBeforePost } from '@/adapters/review';
import { CreateReviewForm } from '@/dispatcher/metadata_types';

export default class ReviewReducer {
	#tokens: Token[];

	constructor() {
		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_REVIEWS_REQUEST, this.getReviews),
			dispatcher.register(EventType.DELETE_REVIEW_REQUEST, this.deleteReview),
			// dispatcher.register(EventType.CREATE_REVIEW_REQUEST, this.createReview),EventType.GET_PROFILE_RESPONSE
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
		this.#sendGetReviews(event.ID)
			.then((reviews: Review[]) => {
				storage.storeReviews(reviews);
				dispatcher.notify(newGetReviewsResponse());
			})
			.catch((error: Error) => {
				console.log(error);
			});
	};

	deleteReview = (metadata: DataType): void => {
		const event = <NumID>metadata;
		this.#sendDeleteReview(event.ID).catch((error: Error) => {
			dispatcher.notify(initErrorPageRequest(error));
		});
	};

	createReview = (metadata: CreateReviewForm): void => {
		const event = <CreateReview>metadata;
		event.placeId = Number(storage.getSight().id);
		this.#sendCreateReview(adaptCreateReviewRequest(event))
			.then((response: CreateReviewResponse) => {
				const position = storage.appendReview(
					adaptCreateReviewResponse(response, storage.getUserMetadata())
				);
				dispatcher.notify(newCreateReviewResponse(position));
			})
			.catch((error: Error) => {
				console.log("something went wrong during POST /review", error);
			});
	};

	#sendGetReviews = (sightID: number): Promise<Review[]> =>
		sendGetJSONRequest(backendEndpoint + reviewsURI + sightID)
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

	#sendCreateReview = (request: CreateReviewRequest): Promise<CreateReviewResponse> =>
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
			.then(response => response.json());
}
