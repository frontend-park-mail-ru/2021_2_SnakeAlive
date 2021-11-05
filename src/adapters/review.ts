import {CreateReview} from "@/dispatcher";
import {CreateReviewRequest, CreateReviewResponse, Review, UserReview} from "@/models/review";
import {UserMetadata} from "@/models";

export function adaptCreateReviewRequest(event: CreateReview): CreateReviewRequest {
    return <CreateReviewRequest>{
        title: event.title,
        text: event.text,
        rating: event.rating,
        place_id: event.place_id,
    }
}

export function adaptCreateReviewResponse(response: CreateReviewResponse, user: UserMetadata): Review {
    return <Review>{
        id: response.id,
        title: response.title,
        text: response.text,
        owned: true,
        user: <UserReview>{
            profileImage: user.avatarPath,
            name: user.name,
            surname: user.surname,
        }
    }
}