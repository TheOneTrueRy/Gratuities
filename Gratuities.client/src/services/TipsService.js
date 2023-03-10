import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TipsService {
    async getTipsReceived() {
        const res = await api.get('account/tips/received')
        AppState.receivedTips = res.data.reverse()
        const currentMonth = new Date().getMonth()
        const tipsThisMonth = []
        logger.log('the tips i have received:', AppState.receivedTips)
        res.data.forEach(t => {
            if (new Date(t.createdAt).getMonth() == currentMonth) {
                tipsThisMonth.push(t)
            }
        })
        tipsThisMonth.sort((a, b) => b.tip - a.tip)
        const sortedTips = AppState.receivedTips.sort((a, b) => b.tip - a.tip)
        AppState.highestTipMonth = tipsThisMonth[0].tip
        AppState.highestTipEver = sortedTips[0].tip
        logger.log('Highest Tip This Month:', AppState.highestTipMonth)
    }
    async getTipsGiven() {
        const res = await api.get('account/tips/sent')
        AppState.givenTips = res.data.reverse()
        logger.log('the tips i have given:', AppState.givenTips)
    }

    async sendTip(profileId, tip) {
        const res = await api.post(`api/profiles/${profileId}/tips`, tip)
    }
}
export const tipsService = new TipsService