import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Business } from "../models/Business.js"

class BusinessesService {

    async getHighestRatedBusinesses() {
        const res = await api.get('api/businesses')
        AppState.businesses = res.data.map(b => new Business(b))
        // TODO need to add rating to businesses once we get profile ratings
        logger.log('[ALL BUSINESSES]', AppState.businesses)
    }

    async getBusinessesByQuery(query) {
        const res = await api.get('/api/businesses', { params: { name: query.query } })
        AppState.businesses = res.data.map(b => new Business(b))
        logger.log('[FOUND BUSINESSES]', AppState.businesses)
    }

    async newBusiness(formData){
        const res = await api.post('api/businesses', formData)
        AppState.businesses.push(res.data)
        return res.data
    }

    async getMyBusiness(userId){
        const res = await api.get('api/businesses')
        const myBusiness = res.data.find(b => b.ownerId == userId)
        AppState.businesses = myBusiness
        logger.log('my businesses:',myBusiness)
    }
}

export const businessesService = new BusinessesService()