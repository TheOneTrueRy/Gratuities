import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class BusinessesService {



    async updateBusiness(user, body) {
        const account = await dbContext.Businesses.findById(user.id)
        if (!account) {
            throw new BadRequest('Invalid account Id')
        }

        if (body.currency < 0.01) {
            throw new BadRequest("You can't get negative money.")
        }

        account.name = body.name || account.name
        account.picture = body.picture || account.picture
        account.currency = (account.currency + body.currency) || account.currency
        account.bio = body.bio || account.bio
        account.openToFeedback = body.openToFeedback || account.openToFeedback
        account.tips = body.tips || account.tips
        account.rating = body.rating || account.rating
        // const account = await dbContext.Account.findOneAndUpdate(
        //   { _id: user.id },
        //   { $set: update },
        //   { runValidators: true, setDefaultsOnInsert: true, new: true }
        // )
        await account.save()
        return account
    }

    async deleteBusiness(requestorId, businessId) {
        const foundBusiness = await this.getBusinessById(businessId);
        if (foundBusiness.ownerId.toString() != requestorId) {
            throw new Forbidden('Tis not your business')
        }
        await foundBusiness.remove()
        return foundBusiness
    }
    async getBusinessById(businessId) {
        const business = await dbContext.Businesses.findById(businessId).populate('owner', 'name picture email');
        if (!business) {
            throw new BadRequest('Bad Business ID')
        }
        return business
    }
    async createBusiness(body) {
        const business = await dbContext.Businesses.create(body)
        await business.populate('owner', 'name picture email')
        return business
    }


    async findBusinesses(name = '') {
        const filter = new RegExp(name, 'ig')
        return await dbContext.Businesses
            .aggregate([{
                $match: { name: filter }
            }])
            .collation({ locale: 'en_US', strength: 1 })
            // .skip(Number(offset))
            // .limit(20)
            .exec()
    }

}
export const businessesService = new BusinessesService();