import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Review } from '../models/Review'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(formData) {
    const res = await api.put('/account', formData)
    logger.log('[Edit Account]', res.data)
    AppState.account = new Account(res.data)
  }

  async getMyReviews() {
    const account = new Account(AppState.account)
    const res = await api.get(`api/profiles/${account.id}/reviews`)
    AppState.myReviews = await res.data.map(r => new Review(r))
    // logger.log('my reviews', AppState.myReviews)
    AppState.hasNotifications = true
  }

  async getChat(chatId) {
    
  }
}

export const accountService = new AccountService()
