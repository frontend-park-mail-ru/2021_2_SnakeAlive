import {CreateReview, Empty, EventType, ID, IEvent} from "@/dispatcher";

const newGetReviewsRequest = (ID: number): IEvent =>
    <IEvent>{
        key: EventType.GET_REVIEWS_REQUEST,
        metadata: <ID>{
            ID,
        }
    }

const newGetReviewsResponse = (): IEvent =>
    <IEvent>{
        key: EventType.GET_REVIEWS_RESPONSE,
        metadata: <Empty>{},
    }

const newDeleteReviewRequest = (ID: number): IEvent =>
    <IEvent>{
        key: EventType.DELETE_REVIEW_REQUEST,
        metadata: <ID>{
            ID,
        }
    }

const newCreateReviewRequest = (
    title: string,
    text: string,
    rating: number,
    place_id: number
): IEvent =>
    <IEvent>{
        key: EventType.CREATE_REVIEW_REQUEST,
        metadata: <CreateReview>{
            title, text, rating, place_id,
        }
    }

const newCreateReviewResponse = (position: number): IEvent =>
    <IEvent>{
        key: EventType.CREATE_REVIEW_RESPONSE,
        metadata: <ID>{ID: position}
    }

export {
    newGetReviewsRequest,
    newGetReviewsResponse,
    newDeleteReviewRequest,
    newCreateReviewRequest,
    newCreateReviewResponse,
}