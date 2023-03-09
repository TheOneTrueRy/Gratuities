import { dbContext } from "../db/DbContext";

class EmployeesService {
    async higherEmployees(body) {
        const employee = await dbContext.Employees.create(body)
        await employee.populate('employee business', 'name picture logo')
        return employee
    }

}

export const employeesService = new EmployeesService();