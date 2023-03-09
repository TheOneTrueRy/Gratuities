import { logger } from "../utils/Logger.js"
import { api, QR_api } from "./AxiosService.js"
import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";


class ProfilesService {

    async getHighestRatedProfiles() {
        const res = await api.get('api/profiles')
        AppState.profiles = res.data.map(p => new Profile(p))
        logger.log('[ALL PROFILES]', AppState.profiles)

        // TODO need to sort profiles once we get ratings calculated
    }
    async getProfilesByQuery(query) {
        const res = await api.get('api/profiles', { params: { name: query.query } })
        AppState.profiles = res.data.map(p => new Profile(p))
        logger.log('[FOUND PROFILES]', AppState.profiles)
    }

    async getProfileById(profileId) {
        AppState.profile = null
        const res = await api.get('api/profiles/' + profileId)
        AppState.profile = new Profile(res.data)
        logger.log(AppState.profile)
    }

    async generateQRCode(profileId) {
        AppState.QRCode = `https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:8080/#/profiles/${profileId};size=100x100`
    }
}

export const profilesService = new ProfilesService()