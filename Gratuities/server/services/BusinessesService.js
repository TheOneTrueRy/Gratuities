import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class BusinessesService {
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