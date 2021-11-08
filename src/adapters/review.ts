import { CreateReview } from '@/dispatcher';
import { CreateReviewRequest, CreateReviewResponse, Review, UserReview } from '@/models/review';
import { UserMetadata } from '@/models';
import { sendPostJSONRequest } from '@/http';
import { backendEndpoint, reviewURI } from '@/constants';

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
		owned: true,
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
