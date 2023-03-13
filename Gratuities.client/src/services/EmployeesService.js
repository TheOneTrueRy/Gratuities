import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EmployeesService{
    async addEmployee(profileId, businessId){
        const res = await api.post('/api/businesses/'+businessId.businessId+'/employees', {accountId: profileId})
        logger.log('aaaaa',res)
    }
}

export const employeesService = new EmployeesService