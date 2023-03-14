import { courier } from "../../authkey"
import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"
import { profileService } from "./ProfileService"

class ReviewsService {
    async getReviews(profileId) {
        const reviews = await dbContext.Reviews.find({ reviewedId: profileId }).populate('creator', 'name picture')
        return reviews
    }
    async giveReview(body) {
        const reviewer = await profileService.getProfileById(body.creatorId)
        const receiver = await profileService.getProfileById(body.reviewedId)

        if (reviewer == receiver) {
            throw new Forbidden("You can't review yourself naughty naughty")
        }

        const review = await dbContext.Reviews.create(body)
        await review.populate('creator', 'name picture')
        if (!body.body) {
            body.body = "We at Gratitudes are wanting you to be the best at what you do."
        }

        if (receiver.notifications) {
            await courier.send({
                message: {
                    to: {
                        email: receiver.email,
                    },
                    template: "4K1YX40ZRA4F9FQ7R11DX6575RAP",
                    data: {
                        firstName: receiver.name,
                        senderName: reviewer.name,
                        reviewRating: body.rating,
                        reviewBody: body.body
                    },
                },
            });
        }

        return review
    }

    async reviewsIsOpened(requestorId) {
        const reviews = await dbContext.Reviews.find({ reviewedId: requestorId })
        reviews.forEach(async r => {
          r.isOpened = true
          await r.save()
        })
        return reviews
      }

}
export const reviewsService = new ReviewsService