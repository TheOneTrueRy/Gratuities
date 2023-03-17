import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class FeedbacksService {
    async sendFeedback(body) {
        if (body.receiverId == body.giverId) {
            throw new Forbidden("You can't give yourself feedback")
        }
        const feedback = await dbContext.Feedbacks.create(body)
        await feedback.populate('giver reciever', 'name picture')
        return feedback
    }

}

export const feedbacksService = new FeedbacksService()