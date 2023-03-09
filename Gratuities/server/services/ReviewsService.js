import { dbContext } from "../db/DbContext"

class ReviewsService {
    async giveReview(body) {
        const review = await dbContext.Reviews.create(body)
        await review.populate('creator', 'name picture')
        return review
    }

}
export const reviewsService = new ReviewsService