import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { feedbacksService } from '../services/FeedbacksService'
import { reviewsService } from '../services/ReviewsService'
import { tipsService } from '../services/TipsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:chatId', this.getChatFeedback)
      .get('', this.getUserAccount)
      .get('/tips/received', this.getReceivedTips)
      .get('/tips/sent', this.getSentTips)
      .get('/reviews', this.getReviews)
      .put('', this.editAccount)
      .delete('/tips', this.tipsIsPayedOut)
      .delete('/notifications', this.notificationsOpened)
  }

  async getChatFeedback(req, res, next) {
    try {
      const requestorId = req.userInfo.id
      const chatId = req.params.chatId
      const feedback = await feedbacksService.getMyChatFeedback(requestorId, chatId)
      return res.send(feedback)
    } catch (error) {
      next(error)
    }
  }
  async notificationsOpened(req, res, next) {
    try {
      const requestorId = req.userInfo.id
      const reviews = await reviewsService.reviewsIsOpened(requestorId)
      const tips = await tipsService.tipsIsOpened(requestorId)
      const notifications = [...tips, ...reviews]
      return res.send(notifications)
    } catch (error) {
      next(error)
    }
  }
  async tipsIsPayedOut(req, res, next) {
    try {
      const requestorId = req.userInfo.id
      const tips = await tipsService.tipsIsPayedOut(requestorId)
      return res.send(tips)
    } catch (error) {
      next(error.message)
    }
  }
  async getReviews(req, res, next) {
    try {
      const userId = req.userInfo.id
      const reviews = await reviewsService.getReviews(userId)
      return res.send(reviews)
    } catch (error) {
      next(error)
    }
  }
  async getSentTips(req, res, next) {
    try {
      const userId = req.userInfo.id
      const tips = await tipsService.getSentTips(userId)
      return res.send(tips)
    } catch (error) {
      next(error)
    }
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
