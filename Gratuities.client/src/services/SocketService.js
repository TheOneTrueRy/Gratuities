import { AppState } from '../AppState'
import { Review } from '../models/Review'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('toUser:creatingReview', this.createReview)
      .on('toUser:creatingTip', this.createTip)
      
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }
  createReview(payload){
    try {
      Pop.toast(`${payload.creator.name} gave you a review!`)
      AppState.notifications.unshift(new Review(payload))
    } catch (error) {
      Pop.error(error.message)
      logger.error(error)
    }
  }
  createTip(payload){
    try {
      Pop.toast(`${payload.giver.name} gave you a tip!`)
      payload.createdAt = new Date(payload.createdAt).toLocaleString('en-US')
      AppState.notifications.unshift(payload)
    } catch (error) {
      Pop.error(error.message)
      logger.error(error)
    }
  }
}

export const socketService = new SocketService()
