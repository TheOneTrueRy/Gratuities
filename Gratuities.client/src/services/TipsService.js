import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TipsService{
    async getTipsReceived(){
        const res = await api.get('account/tips/received')
        AppState.receivedTips = res.data
        const currentMonth = new Date().getMonth()
        logger.log('current month:', currentMonth)
        // const tipsThisMonth = res.data.filter()
        logger.log('the tips i have received:', AppState.receivedTips)
        if(res.data.length > 0){
            logger.log('does this work', new Date(res.data[0].createdAt).getMonth())
        }
    }
    async getTipsGiven(){
        const res = await api.get('account/tips/sent')
        AppState.givenTips = res.data
        logger.log('the tips i have given:', AppState.givenTips)
    }
}
export const tipsService = new TipsService