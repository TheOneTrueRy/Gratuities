import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";
import { logger } from "../utils/Logger";
import { businessesService } from "./BusinessesService";

class EmployeesService {
    async deleteEmployee(requestorId, employeeId) {
        const foundEmployee = await dbContext.Employees.findById(employeeId)
        // @ts-ignore
        const businessId = foundEmployee.businessId
        const foundBusiness = await businessesService.getBusinessById(businessId);
        if (foundBusiness.ownerId.toString() != requestorId) {
            throw new Forbidden('Tis not your business')
        }
        // @ts-ignore
        await foundEmployee.remove()
        return foundEmployee
    }
    async getEmployee(name = '', businessId) {
        const filter = new RegExp(name, 'ig')
        const employee = await dbContext.Employees
            .find({
                employeeName: { $regex: filter }, businessId
            })
        return employee
        // .collation({ locale: 'en_US', strength: 1 })
        // .skip(Number(offset))
        // .limit(20)
        // .exec()
    }
    async higherEmployees(body) {
        const foundEmployee = await dbContext.Account.findById(body.accountId)
        // @ts-ignore
        body.employeeName = foundEmployee.name
        // @ts-ignore
        body.employeePicture = foundEmployee.picture
        const employee = await dbContext.Employees.create(body)

        return employee
    }

}

export const employeesService = new EmployeesService();