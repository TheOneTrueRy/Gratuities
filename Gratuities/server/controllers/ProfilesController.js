import { Auth0Provider } from '@bcwdev/auth0provider'
import { request } from 'express'
import { profileService } from '../services/ProfileService.js'
import { reviewsService } from '../services/ReviewsService.js'
import { tipsService } from '../services/TipsService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:profileId/reviews', this.getReviews)
      .put('/:profileId', this.editProfile)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:profileId/tips', this.giveTip)
      .post('/:profileId/reviews', this.giveReview)
      .delete('/reviews/:reviewId', this.deleteReview)
  }
  async deleteReview(req, res, next) {
    try {
      const reviewId = req.params.reviewId
      const requestorId = req.userInfo.id
      const review = await profileService.deleteReview(requestorId, reviewId)
      res.send(review)
    } catch (error) {
      next(error);
    }
  }
  async getReviews(req, res, next) {
    try {
      const reviews = await reviewsService.getReviews(req.params.profileId)
      res.send(reviews)
    } catch (error) {
      next(error);
    }
  }
  async giveReview(req, res, next) {
    try {
      const reviewedId = req.params.profileId
      req.body.reviewedId = reviewedId
      req.body.creatorId = req.userInfo.id
      const review = await reviewsService.giveReview(req.body)
      res.send(review)
    } catch (error) {
      next(error)
    }
  }
  async giveTip(req, res, next) {
    try {
      const receiverId = req.params.profileId
      const tip = req.body
      tip.giverId = req.userInfo.id
      tip.receiverId = receiverId
      const tips = await tipsService.giveTip(tip)
      return res.send(tips)
    } catch (error) {
      next(error)
    }
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async editProfile(req, res, next){
    try {
      const body = req.body
      const profileId = req.params.profileId
      const profile = await profileService.editProfile(profileId, body)
      res.send(profile)
    } catch (error) {
      next(error.message)
    }
  }
}
