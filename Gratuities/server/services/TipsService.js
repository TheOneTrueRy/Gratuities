import { dbContext } from "../db/DbContext"

class TipsService {
    async getMyTips(userId) {
        const myTips = await dbContext.Tips.find({ recieverId: userId })
        return myTips
      }
}

export const tipsService = new TipsService()