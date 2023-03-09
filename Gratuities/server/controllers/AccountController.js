import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { tipsService } from '../services/TipsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('tips/received', this.getReceivedTips)
      .put('', this.editAccount)

  }
  async getReceivedTips(req, res, next) {
    try {
      const userId = req.userInfo.id
      const tips = await tipsService.getReceivedTips(userId)
      return res.send(tips)
    } catch (error) {
      next(error)
    }
  }
  async editAccount(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
