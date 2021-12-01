import { CreateReview } from '@/dispatcher';
import { CreateReviewRequest, CreateReviewResponse, Review, UserReview } from '@/models/review';
import { UserMetadata } from '@/models';
import { sendPostJSONRequest } from '@/http';
import { backendEndpoint, reviewURI } from '@/constants';
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

export const adoptGotReview = (gotReviews: ReviewGotInfo[]): Review[] => {
	console.log(gotReviews);
	const storeReviews: Review[] = [];
	const currentUser = storage.getProfile();
	let userId: number | null = null;
	if (currentUser.meta) {
		userId = currentUser.meta.id;
	}

	gotReviews.forEach(review => {
		let owner = false;
		if (review.user_id === userId) {
			owner = true;
		}
		console.log('OWNED ', owner, ' user from review/from profile: ', review.user_id, ', ', userId);
		storeReviews.push({
			id: review.id,
			title: review.title,
			text: review.text,
			rating: review.rating,
			owner,
			user: <UserReview>{},
		});
	});
	return storeReviews;
};
