import { CreateReview } from '@/dispatcher';
import { CreateReviewRequest, CreateReviewResponse, Review, UserReview } from '@/models/review';
import { UserMetadata } from '@/models';
import { storage } from '@/storage';
import { GetProfileResponse } from '@/models/profile';
import { isStdAvatar } from '@/adapters/profile';
import avatarPath from '../../image/test.webp';

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
	place_id: number;
	rating: number;
	text: string;
	title: string;
	user_id: number;
}

const adoptUserForReview = (user: GetProfileResponse): UserReview => {
	let profileImage = user.avatar;
	if (isStdAvatar(profileImage)) {
		profileImage = avatarPath;
	}
	return {
		userId: user.id,
		name: user.name,
		surname: user.surname,
		profileImage
	}
}

export const adoptGotReview = (gotReviews: ReviewGotInfo[], users: GetProfileResponse[]): Review[] => {
	const storeReviews: Review[] = [];
	const currentUser = storage.getProfile();
	let userId: number | null = null;
	if (currentUser.meta) {
		userId = currentUser.meta.id;
	}

	if (!gotReviews) {
		return storeReviews;
	}

	let PP = 0;
	gotReviews.forEach(review => {
		let owner = false;
		if (review.user_id === userId) {
			owner = true;
		}

		const author = users.find((user) => user.id ===review.user_id );
		let user = <UserReview>{};
		if (author !== undefined) {
			user = adoptUserForReview(author);
		}

		storeReviews.push({
			id: review.id,
			title: review.title,
			text: review.text,
			rating: review.rating,
			owner,
			user,
			PP
		});
		PP += 1;
	});
	return storeReviews;
};
