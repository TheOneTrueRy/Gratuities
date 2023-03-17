import { dbContext } from "../db/DbContext"

class FeedbacksService {
    async sendFeedback(body) {
        const feedback = await dbContext.Feedbacks.create(body)
        await feedback.populate('giver reciever', 'name picture')
        return feedback
    }

}

export const feedbacksService = new FeedbacksService()