import { dbContext } from "../db/DbContext"

class ReviewsService {
    async getReviews(profileId) {
        const reviews = await dbContext.Reviews.find({ reviewedId: profileId }).populate('creator', 'name picture')
        return reviews
    }
    async giveReview(body) {
        const review = await dbContext.Reviews.create(body)
        await review.populate('creator', 'name picture')
        return review
    }

}
export const reviewsService = new ReviewsService