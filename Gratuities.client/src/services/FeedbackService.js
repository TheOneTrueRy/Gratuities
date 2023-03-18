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
                // logger.log('appstate', AppState.chat, c.receiverId, profileId)
                return
            }else if (c.starterId == profileId) {
                AppState.chat = c
                // logger.log('2')
                return
            }
        })
    }

    async createChat(profileId) {
        const res = await api.post('api/profiles/' + profileId + '/chats')
        AppState.chat = res.data
        AppState.chats.push(res.data)
    }

    async getFeedbackInChat() {
        const res = await api.get('account/chats/' + AppState.chat.id)
        AppState.feedback = res.data
    }
}

export const feedbackService = new FeedbackService()