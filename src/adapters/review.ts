import { CreateReview } from '@/dispatcher';
import { CreateReviewRequest, CreateReviewResponse, Review, UserReview } from '@/models/review';
import { UserMetadata } from '@/models';
import { storage } from '@/storage';

export function adaptCreateReviewRequest(event: CreateReview): CreateReviewRequest {
	return <CreateReviewRequest>{
		title: event.title,
		text: event.text,
		rating: event.rating,
		placeId: event.placeId,
	};
}

export function adaptCreateReviewResponse(
	response: CreateReviewResponse,
	user: UserMetadata
): Review {
	return <Review>{
		id: response.id,
		title: response.title,
		text: response.text,
		owner: true,
		user: <UserReview>{
			profileImage: user.avatarPath,
			name: user.name,
			surname: user.surname,
		},
	};
}

interface backReviewPost {
	title: string;
	text: string;
	rating: number;
	// eslint-disable-next-line camelcase
	place_id: number;
}

export const adoptReviewBeforePost = (request: CreateReviewRequest): backReviewPost => {
	const { title, text, rating, placeId } = request;
	return {
		title,
		text,
		rating,
		place_id: placeId,
	};
};

export interface ReviewGotInfo {
	id: number;
	// eslint-disable-next-line camelcase
	place_id: number;
	rating: number;
	text: string;
	title: string;
	// eslint-disable-next-line camelcase
	user_id: number;
}

export const adoptGotReview = (gotReviews: ReviewGotInfo[], users: UserReview[]): Review[] => {
	const storeReviews: Review[] = [];
	const currentUser = storage.getProfile();
	let userId: number | null = null;
	if (currentUser.meta) {
		userId = currentUser.meta.id;
	}

	if (!gotReviews) {
		return storeReviews;
	}

	let i = 0;
	gotReviews.forEach(review => {
		let owner = false;
		if (review.user_id === userId) {
			owner = true;
		}
		storeReviews.push({
			id: review.id,
			title: review.title,
			text: review.text,
			rating: review.rating,
			owner,
			user: users[i],
		});
		i += 1;
	});
	return storeReviews;
};
