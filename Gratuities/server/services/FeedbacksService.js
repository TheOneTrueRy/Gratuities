import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class FeedbacksService {
    async getMyChats(requestorId) {
        const chatsStarted = await dbContext.Chats.find({starterId: requestorId })
        const chatsRecieved = await dbContext.Chats.find({ receiverId: requestorId })
        const chats = [...chatsStarted, ...chatsRecieved]
        return chats
    }
    async getMyChatFeedback(requestorId, chatId) {
        const feedbackGiven = await dbContext.Feedbacks.find({ chatId, giverId: requestorId })
        const feedbackRecieved = await dbContext.Feedbacks.find({ chatId, receiverId: requestorId })
        const feedback = [...feedbackGiven, ...feedbackRecieved]
        return feedback
    }
    async createChat(body) {
        const chat = await dbContext.Chats.create(body)
        await chat.populate('starter receiver', 'name picture')
        return chat
    }
    async gettingMyFeedback(requestorId) {
        const feedbackGiven = await dbContext.Feedbacks.find({ giverId: requestorId })
        const feedbackRecieved = await dbContext.Feedbacks.find({ receiverId: requestorId })
        const feedback = [...feedbackGiven, ...feedbackRecieved]
        return feedback
    }

    async sendFeedback(body) {
        if (body.receiverId == body.giverId) {
            throw new Forbidden("You can't give yourself feedback")
        }
        const feedback = await dbContext.Feedbacks.create(body)
        await feedback.populate('giver receiver', 'name picture')
        return feedback
    }
}

export const feedbacksService = new FeedbacksService()