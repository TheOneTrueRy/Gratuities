import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class FeedbacksService {
    async getMyChats(requestorId) {
        const chatsStarted = await dbContext.Chats.find({ starterId: requestorId }).populate('starter receiver', 'name picture')
        const chatsRecieved = await dbContext.Chats.find({ receiverId: requestorId }).populate('starter receiver', 'name picture')
        const chats = [...chatsStarted, ...chatsRecieved]
        return chats
    }
    async getMyChatFeedback(requestorId, chatId) {
        const feedbackGiven = await dbContext.Feedbacks.find({ chatId, giverId: requestorId }).populate('giver receiver', 'name picture')
        const feedbackRecieved = await dbContext.Feedbacks.find({ chatId, receiverId: requestorId }).populate('giver receiver', 'name picture')
        const feedback = [...feedbackGiven, ...feedbackRecieved]
        return feedback
    }
    async createChat(body) {
        const chat = await dbContext.Chats.create(body)
        await chat.populate('starter receiver', 'name picture')
        return chat
    }
    async createFeedback(body) {
        const chat = await dbContext.Chats.findById(body.chatId)
        if (!chat) {
            throw new BadRequest('This chat Id is invalid')
        }
        // @ts-ignore
        if (chat.starterId == body.giverId) {
            body.receiverId = chat.receiverId  
        } else {
            body.receiverId = chat.starterId
        }

        if (body.receiverId == body.giverId) {
            throw new Forbidden("You can't give yourself feedback")
        }

        const feedback = await dbContext.Feedbacks.create(body)
        await feedback.populate('giver receiver', 'name picture')
        return feedback
    }
}

export const feedbacksService = new FeedbacksService()