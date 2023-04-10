import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";
import { Review } from "../models/Review.js";
import { ratingsService } from "./RatingsService.js";
import { accountService } from "./AccountService.js";

class ProfilesService {

    async getHighestRatedProfiles() {
        const res = await api.get('api/profiles')
        AppState.profiles = res.data.map(p => new Profile(p))
        AppState.profiles.forEach(p => {
            if (p.rating == null) {
                p.rating = 0
            }
        })
        AppState.profiles.sort(function (a, b) { return a.rating - b.rating }).reverse()
    }
    async getProfilesByQuery(query) {
        const res = await api.get('api/profiles', { params: { name: query.query } })
        AppState.profiles = res.data.map(p => new Profile(p))
    }

    async getProfileById(profileId) {
        AppState.profile = null
        const res = await api.get('api/profiles/' + profileId)
        AppState.profile = new Profile(res.data)
    }

    async getReviewsByProfileId(profileId) {
        AppState.reviews = []
        const res = await api.get(`api/profiles/${profileId}/reviews`)
        AppState.reviews = res.data.map(r => new Review(r))

        // NOTE vvv sorts reviews BY RATING - highest to lowest
        AppState.reviews.sort(function (a, b) { return a.rating - b.rating }).reverse()
    }

    async generateQRCode(profileId) {
        AppState.QRCode = `https://api.qrserver.com/v1/create-qr-code/?data=https://gratuities.onrender.com/%23/profiles/${profileId};size=100x100`
    }

    async leaveReview(reviewData, profileId) {
        const res = await api.post(`api/profiles/${profileId}/reviews`, reviewData)
        AppState.reviews.unshift(new Review(res.data))
        ratingsService.calculateProfileRating(profileId)
    }

    // async startChat(profileId) {
    //     if (AppState.chat && AppState.chat.receiverId != profileId) {
    //         const res = await api.post(`api/profiles/${profileId}/chats`)
    //         AppState.chat = res.data
    //         logger.log('APPSTATE CHAT', AppState.chat)
    //     } else if (AppState.chat) {
    //         const chatId = AppState.chat.id
    //         await accountService.getChat(chatId)
    //         logger.log('APPSTATE CHAT', AppState.chat)
    //     } else {
    //         logger.log('this is bananas')
    //     }
    // }
}

export const profilesService = new ProfilesService()