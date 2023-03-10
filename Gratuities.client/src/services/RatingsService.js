import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class RatingsService{
async calculateRating(id){
const res = await api.get('account/reviews')
logger.log('reviews:',res.data)
}
}
export const ratingsService = new RatingsService 