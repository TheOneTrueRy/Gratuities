import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { profileService } from "./ProfileService"

class TipsService {
  async giveTip(tip) {
    const giver = await profileService.getProfileById(tip.giverId)
    const reciever = await profileService.getProfileById(tip.recieverId)

    if (giver.currency < tip.tip) {
      throw new BadRequest("You don't have enough money", giver.name)
    }

    const tips = await dbContext.Tips.create(tip)
    giver.currency -= tip.tip
    reciever.currency += tip.tip
    await tips.populate('giver', 'name picture')
    return tips
  }
  async getMyTips(userId) {
    const myTips = await dbContext.Tips.find({ recieverId: userId }).populate('giver', 'name picture')
    return myTips
  }
}

export const tipsService = new TipsService()