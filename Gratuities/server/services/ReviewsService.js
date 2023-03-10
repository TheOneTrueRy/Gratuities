import { dbContext } from "../db/DbContext"
import { profileService } from "./ProfileService"

class ReviewsService {
    async getReviews(profileId) {
        const reviews = await dbContext.Reviews.find({ reviewedId: profileId }).populate('creator', 'name picture')
        return reviews
    }
    async giveReview(body) {
        const giver = await profileService.getProfileById(body.creatorId)
        const receiver = await profileService.getProfileById(body.reviewedId)
        
        const review = await dbContext.Reviews.create(body)
        await review.populate('creator', 'name picture')
        return review
    }

}
export const reviewsService = new ReviewsService