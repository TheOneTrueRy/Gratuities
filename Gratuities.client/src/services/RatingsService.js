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

    async deleteReview(reviewId){
        const res = await api.delete('api/profiles/reviews/' + reviewId)
        const reviewIndex = AppState.reviews.findIndex(r=>r.id == reviewId)
        if (reviewIndex >= 0) {
            AppState.reviews.splice(reviewIndex, 1)
        }
    }
}
export const ratingsService = new RatingsService 