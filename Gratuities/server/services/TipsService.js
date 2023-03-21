import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
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
    let tip = 0
    tips.forEach(async t => {
      if(!t.isPayedOut) {
        // await accountService.updateAccount(user, { currency: t.tip })
        tip += t.tip
        t.isPayedOut = true
        await t.save()
      }
    })
    await accountService.updateAccount(user, { currency: tip })
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
    if (giver.id == receiver.id){
      throw new Forbidden("You can't give yourself a tip!")
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
          template: "3E5ZS3WKF54MRXPP2F94JW59163Y",
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