import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

// IMPORTANT profiles should not be updated or modified in any way here. Use the AccountService

class ProfileService {
  async deleteReview(requestorId, reviewId) {
    const foundReview = await dbContext.Reviews.findById(reviewId)
    // @ts-ignore
    if (!foundReview) {
      throw new BadRequest('invalid review id: ' + reviewId)
    }
    if (foundReview.creatorId.toString() != requestorId) {
      throw new Forbidden('Tis not your business')
    }
    await foundReview.remove()
    return foundReview
  }
  /**
    * Returns a user profile from its id
    * @param {string} id
   */
  async getProfileById(id) {
    const profile = await dbContext.Account.findById(id)
    if (!profile) {
      throw new BadRequest('Invalid Profile ID')
    }
    return profile
  }

  /**
    * Returns a list user profiles from a query search of name likeness
    * limits to first 20 without offset
    * @param {string} name
   */
  async findProfiles(name = '') {
    const filter = new RegExp(name, 'ig')
    return await dbContext.Account
      .aggregate([{
        $match: { name: filter }
      }])
      .collation({ locale: 'en_US', strength: 1 })
      // .skip(Number(offset))
      // .limit(20)
      .exec()
  }

  async editProfile(id, rating){
    const profile = await dbContext.Account.findById(id)
    profile.rating = rating
    profile.save()
    return profile
  }
}

export const profileService = new ProfileService()
