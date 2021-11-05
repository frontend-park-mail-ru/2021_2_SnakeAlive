export interface UserReview {
	userId: number;
	profileImage: string;
	name: string;
	surname: string;
}

export interface Review {
	id: number;
	title: string;
	text: string;
	owned: boolean;
	user: UserReview;
}

export interface CreateReviewRequest {
	title: string;
	text: string;
	rating: number;
	placeId: number;
}

export interface CreateReviewResponse {
	id: number;
	title: string;
	text: string;
	rating: number;
}
