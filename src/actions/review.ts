import { CreateReview, Empty, EventType, NumID, IEvent } from '@/dispatcher';

const newGetReviewsRequest = (ID: number): IEvent =>
	<IEvent>{
		key: EventType.GET_REVIEWS_REQUEST,
		metadata: <NumID>{
			ID,
		},
	};

const newGetReviewsResponse = (): IEvent =>
	<IEvent>{
		key: EventType.GET_REVIEWS_RESPONSE,
		metadata: <Empty>{},
	};

const newDeleteReviewRequest = (ID: number): IEvent =>
	<IEvent>{
		key: EventType.DELETE_REVIEW_REQUEST,
		metadata: <NumID>{
			ID,
		},
	};

const newCreateReviewRequest = (
	title: string,
	text: string,
	rating: number,
	placeId: number
): IEvent =>
	<IEvent>{
		key: EventType.CREATE_REVIEW_REQUEST,
		metadata: <CreateReview>{
			title,
			text,
			rating,
			placeId,
		},
	};

const newCreateReviewResponse = (position: number): IEvent =>
	<IEvent>{
		key: EventType.CREATE_REVIEW_RESPONSE,
		metadata: <NumID>{ ID: position },
	};

export {
	newGetReviewsRequest,
	newGetReviewsResponse,
	newDeleteReviewRequest,
	newCreateReviewRequest,
	newCreateReviewResponse,
};
