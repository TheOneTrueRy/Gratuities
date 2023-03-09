import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { profileService } from "./ProfileService"

class TipsService {
  async getSentTips(userId) {
    const myTips = await dbContext.Tips.find({ giverId: userId }).populate('giver', 'name picture')
    return myTips
  }
  async giveTip(tip) {
    const giver = await profileService.getProfileById(tip.giverId)
    const receiver = await profileService.getProfileById(tip.receiverId)

    if (giver.currency < tip.tip) {
      throw new BadRequest("You don't have enough money")
    }

    const tips = await dbContext.Tips.create(tip)
    giver.currency -= tip.tip
    receiver.currency += tip.tip
    await tips.populate('giver', 'name picture')
    return tips
  }
  async getReceivedTips(userId) {
    const myTips = await dbContext.Tips.find({ receiverId: userId }).populate('giver', 'name picture')
    return myTips
  }
}

export const tipsService = new TipsService()