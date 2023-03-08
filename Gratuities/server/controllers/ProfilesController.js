import { Auth0Provider } from '@bcwdev/auth0provider'
import { profileService } from '../services/ProfileService.js'
import { tipsService } from '../services/TipsService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/:profileId/tips', this.giveTip)
  }
  async giveTip(req,res,next) {
    try {
      const recieverId = req.params.profileId
      const tip = req.body
      tip.giverId = req.userInfo.id
      tip.recieverId = recieverId
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
}
