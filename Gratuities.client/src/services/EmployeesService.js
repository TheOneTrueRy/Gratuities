import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { AppState } from '../AppState';
import { Employee, Profile } from "../models/Profile";


class EmployeesService{
    async addEmployee(profileId, businessId){
        const res = await api.post('/api/businesses/' + businessId.businessId + '/employees', { accountId: profileId })
        return res.data
    }

    async getEmployeesByBusinessId(businessId){
        const res = await api.get('api/businesses/'+businessId+'/employees')
        AppState.employees = res.data.map(e=> new Employee(e))
    }

    async getEmployeeByQuery(query,  businessId){
        const res = await api.get('api/businesses/' + businessId + '/employees', { params: { name: query.query } })
        AppState.employees = res.data.map(e=> new Profile(e))
    }

    async removeEmployee(employeeId){
        const res = await api.delete('api/businesses/employees/' + employeeId)
        const foundEmployee = AppState.employees.findIndex(e => e.employeeId == employeeId)
        AppState.employees.splice(foundEmployee, 1)
    }
}

export const employeesService = new EmployeesService