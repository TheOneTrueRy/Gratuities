import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"

class BusinessesService {

    async getHighestRatedBusinesses() {
        const res = await api.get('api/businesses')
        AppState.businesses = res.data
        logger.log('[APPSTATE.businesses]', AppState.businesses)
    }
}

export const businessesService = new BusinessesService()