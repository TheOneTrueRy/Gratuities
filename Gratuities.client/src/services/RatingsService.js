import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class RatingsService {
    async calculateAccountRating() {
        const res = await api.get('account/reviews')
        const review = res.data
        const mappedRating = review.map(r => r.rating)
        let average = 0
        mappedRating.forEach(r => {
            average += r
        })
        average = average / mappedRating.length;
        let rating = Math.round(average * 2) / 2
        logger.log('average:', rating)
        const setRating = await api.put('account', rating)
        AppState.account.rating = rating
    }

    async calculateProfileRating(profileId) {
        const res = await api.get(`api/profiles/${profileId}/reviews`)
        const review = res.data

        const mappedRating = review.map(r => r.rating)
        
        let average = 0

        mappedRating.forEach(r => {
            average += r
        })
        average = average / mappedRating.length
        let rating = Math.round(average * 2) / 2
        AppState.profile.rating = rating
    }
}
export const ratingsService = new RatingsService 