import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class BusinessesService {
    async deleteBusiness(requestorId, businessId) {
        const foundBusiness = await this.getBusinessById(businessId);
        if (foundBusiness?.ownerId !== requestorId) {
            throw new Forbidden('Tis not your business')
        }
        await foundBusiness?.remove()
        return foundBusiness
    }
    async getBusinessById(businessId) {
        const business = await dbContext.Businesses.findById(businessId).populate('owner', 'name picture email');
        return business
    }
    async createBusiness(body) {
        const business = await (await dbContext.Businesses.create(body))
        await business.populate('owner', 'name picture email')
        return business
    }
    async getBusinesses() {
        const businesses = await dbContext.Businesses.find();
        return businesses
    }

}
export const businessesService = new BusinessesService();