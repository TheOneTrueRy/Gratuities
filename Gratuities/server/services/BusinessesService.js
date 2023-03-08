import { dbContext } from "../db/DbContext";

class BusinessesService {
    async createBusiness(body) {
        const business = await dbContext.Businesses.create(body)
        return business
    }
    async getBusinesses() {
        const businesses = await dbContext.Businesses.find();
        return businesses
    }

}
export const businessesService = new BusinessesService();