import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { profileService } from "./ProfileService"
import { courier } from "../../authkey";

class TipsService {
  async getSentTips(userId) {
    const myTips = await dbContext.Tips.find({ giverId: userId }).populate('receiver', 'name rating picture')
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
    receiver.tips += tip.tip
    await giver.save()
    await receiver.save()
    await tips.populate('giver receiver', 'name picture')


    await courier.send({
      message: {
        to: { email: receiver.email },
        template: "Y8REJMFD13M9MFQJVRRXH45T3HHA",
        data: {
          receiverName: receiver.name,
          senderName: giver.name,
          tip: tip.tip
        },
      },
    });
    return tips
  }
  async getReceivedTips(userId) {
    const myTips = await dbContext.Tips.find({ receiverId: userId }).populate('giver', 'name picture')
    return myTips
  }
}

export const tipsService = new TipsService()