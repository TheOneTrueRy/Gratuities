import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TipsService{
    async getTipsReceived(){
        const res = await api.get('account/tips/received')
        AppState.receivedTips = res.data
        logger.log('the tips i have received:', AppState.receivedTips)
    }
    async getTipsGiven(){
        const res = await api.get('account/tips/sent')
        AppState.givenTips = res.data
        logger.log('the tips i have given:', AppState.givenTips)
    }
}
export const tipsService = new TipsService