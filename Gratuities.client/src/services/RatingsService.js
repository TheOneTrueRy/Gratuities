import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class RatingsService{
async calculateAccountRating(){
const res = await api.get('account/reviews')
const review = res.data
const mappedRating = review.map(r=>r.rating)
let average = 0
mappedRating.forEach(r => {
average +=r
})
average = average/mappedRating.length;
    let finalRounded = Math.round(average*2)/2
logger.log('average:', finalRounded)
return finalRounded
}
}
export const ratingsService = new RatingsService 