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
	rating: number;
	owner: boolean;
	user: UserReview;
	PP: number;
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
