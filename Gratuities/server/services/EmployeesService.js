import { dbContext } from "../db/DbContext";

class EmployeesService {
    async getEmployee(name = '', businessId) {
        const filter = new RegExp(name, 'ig')
        const accounts = await dbContext.Account.aggregate([{
            $match: { name: filter }
        }])
            .collation({ locale: 'en_US', strength: 1 })
            // .skip(Number(offset))
            // .limit(20)
            .exec()
        let template = []




    }
    async higherEmployees(body) {
        const foundEmployee = await dbContext.Account.findById(body.accountId)
        // @ts-ignore
        body.employees = { name: foundEmployee.name, picture: foundEmployee.picture }
        const employee = await dbContext.Employees.create(body)

        return employee
    }

}

export const employeesService = new EmployeesService();