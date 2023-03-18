import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class FeedbackService {
    async getMyChats() {
        const res = await api.get('account/chats')
        AppState.chats = res.data
    }

    async getChat(profileId) {
        AppState.chats.forEach(c => {
            if (c.receiverId == profileId) {
                AppState.chat = c
                logger.log(c.receiverId, profileId)
            }else if (c.starterId == profileId) {
                AppState.chat = c
                logger.log('2')
            } else {
                logger.log(c.starterId, profileId)
                AppState.chat = null
            }
        })
    }
}

export const feedbackService = new FeedbackService()