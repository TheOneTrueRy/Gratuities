import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import {profileService} from "./ProfileService"

class TipsService {
    async giveTip(tip) {
        if (!profileService.getProfileById(tip.recieverId)) {
          throw new BadRequest('This user does not exist')
        }
        const tips = await dbContext.Tips.create(tip)
        await tips.populate('giver', 'name picture')
        return tips
    }
    async getMyTips(userId) {
      const myTips = await dbContext.Tips.find(userId)
        return myTips
      }
}

export const tipsService = new TipsService()