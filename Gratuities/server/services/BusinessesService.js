import { dbContext } from "../db/DbContext";

class BusinessesService {
    getBusinesses() {
        const businesses = dbContext.Businesses.find();
        return businesses
    }

}
export const businessesService = new BusinessesService();