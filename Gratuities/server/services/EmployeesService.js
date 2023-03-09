import { dbContext } from "../db/DbContext";

class EmployeesService {
    async getEmployee(name = '', businessId) {
        // const filter = new RegExp(name, 'ig')
        const employees = await dbContext.Employees.find({ businessId: businessId }).populate('employee', 'name picture')
        return employees
        // employees.aggregate([{
        //     $match: { employee: { name: filter } }
        // }])
        //     .collation({ locale: 'en_US', strength: 1 })
        //     // .skip(Number(offset))
        //     // .limit(20)
        //     .exec()
    }
    async higherEmployees(body) {
        const employee = await dbContext.Employees.create(body)
        return employee
    }

}

export const employeesService = new EmployeesService();