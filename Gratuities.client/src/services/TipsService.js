import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TipsService{
    async getTipsReceived(){
        const res = await api.get('account/tips/received')
        AppState.receivedTips = res.data
        logger.log('the tips i have received:',AppState.receivedTips)
        // AppState.givenTips = res.data.filter(t => t.giverId == accountId)
    }
}
export const tipsService = new TipsService