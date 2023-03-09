import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";


class ProfilesService {

    async getHighestRatedProfiles() {
        const res = await api.get('api/profiles')
        AppState.profiles = res.data.map(p => new Profile(p))
        logger.log('[ALL PROFILES]', AppState.profiles)
    }
    async getProfilesByQuery(query) {
        const res = await api.get('api/profiles', { params: { name: query.query } })
        AppState.profiles = res.data.map(p => new Profile(p))
        logger.log('[FOUND PROFILES]', AppState.profiles)
    }

    async generateQRCode() {
        
    }
}

export const profilesService = new ProfilesService()