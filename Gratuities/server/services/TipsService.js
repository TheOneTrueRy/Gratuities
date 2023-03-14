import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { profileService } from "./ProfileService"
import { courier } from "../../authkey";
import { accountService } from "./AccountService";
import { logger } from "../utils/Logger";

class TipsService {
  async tipsIsOpened(requestorId) {
    const tips = await dbContext.Tips.find({ receiverId: requestorId })
    tips.forEach(async t => {
      t.isOpened = true
      await t.save()
    })
    return tips
  }
  
  async tipsIsPayedOut(requestorId) {
    const tips = await dbContext.Tips.find({ receiverId: requestorId })
    const user = await dbContext.Account.findById(requestorId)
    tips.forEach(async t => {
      if (!t.isPayedOut) {
        accountService.updateAccount(user,{ currency: t.tip })
      }
      t.isPayedOut = true
      await t.save()
    })
    return tips
  }
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

    if (receiver.notifications) {
      await courier.send({
        message: {
          to: {
            email: receiver.email
          },
          template: "Y8REJMFD13M9MFQJVRRXH45T3HHA",
          data: {
            receiverName: receiver.name,
            senderName: giver.name,
            tip: tip.tip
          },
        },
      });      
    }

    return tips
  }
  async getReceivedTips(userId) {
    const myTips = await dbContext.Tips.find({ receiverId: userId }).populate('giver', 'name picture')
    return myTips
  }
}

export const tipsService = new TipsService()