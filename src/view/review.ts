import BasicView from '@/view/view';
import { DataType, dispatcher, EventType, NumID, Token } from '@/dispatcher';
import { newCreateReviewRequest, newDeleteReviewRequest } from '@/actions';
import { storage } from '@/storage';
import { Review } from '@/models/review';

export class ReviewsView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('reviews__content');

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_REVIEWS_RESPONSE, this.renderReviews),
			dispatcher.register(EventType.CREATE_REVIEW_RESPONSE, this.appendReview),
		];
	};

	destroy = (metadata: EventType): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	renderReviews = (metadata: DataType): void => {
		const reviews = storage.getReviews();

		// and fucking render
		// id of review: sight_review_{id} => here add callbacks for delete
	};

	appendReview = (metadata: DataType): void => {
		const event = <NumID>metadata;
		const review: Review | null = storage.getReview(event.ID);
		if (review === null) {
			return;
		}

		// add render ???

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.appendLastChild('');
	};

	// for buttons:
	#deleteReview = (ID: number): void => {
		// set comment as deleted
		dispatcher.notify(newDeleteReviewRequest(ID));
	};
}

export class ReviewCreateView extends BasicView {
	constructor() {
		super('reviews__input');
	}

	init = (): void => {
		// choose if user was logged and create redner here
	};

	#createReview = (): void => {
		// как узнать про placeID ???
		// скорее всего взять из storage
		dispatcher.notify(newCreateReviewRequest('', '', 0, 0));
	};
}
