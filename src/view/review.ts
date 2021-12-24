import BasicView from '@/view/view';
import { DataType, dispatcher, EventType, NumID, Token } from '@/dispatcher';
import { newDeleteReviewRequest } from '@/actions/review';
import { storage } from '@/storage';
import { Review } from '@/models/review';
import { initReviewForm } from '@/components';
import { createReviewForm } from '@/components/reviews/review_form';
import reviewsListTemplate from '@/components/reviews/reviews.handlebars';
import { createFrontendQueryParams, router } from '@/router/router';
import { paramsURLfrontend, pathsURLfrontend } from '@/constants';

const initGoAuthorBtn = (review: Review) => {
	console.log(review);
	const btn = document.getElementById(`author_${review.user.userId}_${review.PP}`);
	console.log(btn);console.log(`author_${review.user.userId}}_${review.PP}`);
	if (btn !== null) {
		console.log(btn);
		btn.addEventListener('click', () => {
			if (review.owner) {
				router.go(pathsURLfrontend.profile);
			} else {
				router.go(createFrontendQueryParams(pathsURLfrontend.users, [{
					key: paramsURLfrontend.id,
					value: review.user.userId.toString()
				}]))
			}
		});
	}
}

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

	destroy = (): void => {
		this.#tokens.forEach(element => {
			dispatcher.unregister(element);
		});

		this.setEmpty();
	};

	renderReviews = (): void => {
		const reviews = storage.getReviews();
		console.log(reviews);

		this.setView(reviewsListTemplate({ reviews }));

		if (!reviews) {
			return;
		}

		reviews.forEach(reviewInfo => {
			// значит свой отзыв и можно его удалить
			if (reviewInfo.owner) {
				const deleteBtn = document.getElementById(`delete_button_${String(reviewInfo.id)}`);
				if (deleteBtn !== null) {
					deleteBtn.addEventListener(
						'click',
						event => {
							event.preventDefault();
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							dispatcher.notify(newDeleteReviewRequest(reviewInfo.id));
						},
						false
					);
				}
			}

			initGoAuthorBtn(reviewInfo);
		});
	};

	appendReview = (metadata: DataType): void => {
		const event = <NumID>metadata;
		const review: Review | null = storage.getReview(event.ID);
		if (review === null) {
			return;
		}
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
		if (storage.getProfile().meta !== undefined) {
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
}
