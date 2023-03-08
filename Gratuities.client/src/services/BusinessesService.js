import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Business } from "../models/Business.js"

class BusinessesService {

    async getHighestRatedBusinesses() {
        const res = await api.get('api/businesses')
        AppState.businesses = res.data.map(b => new Business(b))
        // TODO need to add rating to businesses once we get profile ratings
        logger.log('[APPSTATE.businesses]', AppState.businesses)
    }
}

export const businessesService = new BusinessesService()