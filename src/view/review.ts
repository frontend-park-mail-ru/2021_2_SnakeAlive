import BasicView from '@/view/view';
import { DataType, dispatcher, EventType, NumID, Token } from '@/dispatcher';
import { deleteCurrentTripPlace, newCreateReviewRequest, newDeleteReviewRequest } from '@/actions';
import { storage } from '@/storage';
import { Review } from '@/models/review';
import { initReviewForm } from '@/components';
import { createReviewForm } from '@/components/reviews/review_form';
import { UserMetadata } from '@/models';
import reviewsListTemplate from '@/components/reviews/reviews.handlebars';

export class ReviewsView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#reviews__content');

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.GET_REVIEWS_RESPONSE, this.renderReviews),
			dispatcher.register(EventType.CREATE_REVIEW_RESPONSE, this.appendReview),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
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
		this.setView(reviewsListTemplate({ reviews }));

		reviews.forEach(reviewInfo => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const deleteBtn = document.getElementById(`delete_button_${String(reviewInfo.review.id)}`);
			console.log(`delete_button_${reviewInfo.id}`);
			if (deleteBtn !== null) {
				console.log('try to delete');
				deleteBtn.addEventListener(
					'click',
					event => {
						event.preventDefault();
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						dispatcher.notify(newDeleteReviewRequest(reviewInfo.review.id));
						deleteBtn.style.display = 'none';
					},
					false
				);
			}
		});

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

		// изменила на добавление первым
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		this.appendLastChild(reviewsListTemplate({ reviews: review }));
	};

	// for buttons:
	#deleteReview = (ID: number): void => {
		// set comment as deleted
		dispatcher.notify(newDeleteReviewRequest(ID));
	};
}

export class ReviewCreateView extends BasicView {
	#tokens: Token[];

	constructor() {
		super('#sight_page__review_form_place');

		this.#tokens = [];
	}

	init = (): void => {
		this.#tokens = [
			dispatcher.register(EventType.CREATE_REVIEW_FORM, this.createFormIfLogged),
			dispatcher.register(EventType.SET_MAIN_HEADER_LOGGED_RESPONSE, this.createFormIfLogged),
			dispatcher.register(EventType.DESTROY_CURRENT_PAGE_REQUEST, this.destroy),
		];
	};

	createFormIfLogged = () => {
		console.log('in ReviewCreateView');
		if (storage.getUserMetadata().name !== undefined) {
			console.log('in if, got name ', storage.getUserMetadata().name);
			this.#createForm();
		}
	};

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	#createForm = () => {
		this.setView(createReviewForm());
		initReviewForm();
	};

	// #createReview = (): void => {
	// 	// как узнать про placeID ???
	// 	// скорее всего взять из storage
	// 	dispatcher.notify(newCreateReviewRequest('', '', 0, 0));
	// };
}
