import { AppState } from "../AppState"
import { api } from "./AxiosService"

class TipsService{
    async getTips(accountId){
        const res = await api.get('account/tips/')
        // NOTE gonna need to split this into two different functions because they're being filtered on the backend
        AppState.receivedTips = res.data.filter(t => t.receiverId == accountId)
        AppState.givenTips = res.data.filter(t => t.giverId == accountId)
    }
}
export const tipsService = new TipsService