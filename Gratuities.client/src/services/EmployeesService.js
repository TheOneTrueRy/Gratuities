import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from '../AppState';
import { Profile } from "../models/Profile";


class EmployeesService{
    async addEmployee(profileId, businessId){
        const res = await api.post('/api/businesses/'+businessId.businessId+'/employees', {accountId: profileId})
        logger.log('aaaaa',res)
    }

    async getEmployeesByBusinessId(businessId){
        const res = await api.get('api/businesses/'+businessId+'/employees')
        AppState.employees = res.data.map(e=> new Profile(e))
        logger.log('employees:', AppState.employees)
    }

    async getEmployeeByQuery(query,  businessId){
        const res = await api.get('api/businesses/' + businessId + '/employees', { params: { name: query.query } })
        AppState.employees = res.data.map(e=> new Profile(e))
    }
}

export const employeesService = new EmployeesService