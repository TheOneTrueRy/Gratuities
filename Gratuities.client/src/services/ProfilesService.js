import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";
import { Review } from "../models/Review.js";

class ProfilesService {

    async getHighestRatedProfiles() {
        const res = await api.get('api/profiles')
        AppState.profiles = res.data.map(p => new Profile(p))
        logger.log('[ALL PROFILES]', AppState.profiles)

        // TODO make sure this vvv sorts correctly
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
        logger.log(AppState.profile)
    }

    async getReviewsByProfileId(profileId) {
        AppState.reviews = []
        const res = await api.get(`api/profiles/${profileId}/reviews`)
        AppState.reviews = res.data.map(r => new Review(r))

        // NOTE vvv sorts reviews BY RATING - highest to lowest
        AppState.reviews.sort(function (a, b) { return a.rating - b.rating }).reverse()
    }

    async generateQRCode(profileId) {
        AppState.QRCode = `https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:8080/#/profiles/${profileId};size=100x100`
    }

    async leaveReview(reviewData, profileId) {
        const res = await api.post(`api/profiles/${profileId}/reviews`, reviewData)
    }
}

export const profilesService = new ProfilesService()