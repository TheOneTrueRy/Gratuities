import { courier } from "../../authkey";
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
        // @ts-ignore
        body.employeeRating = foundEmployee.rating
        // @ts-ignore
        body.employeeBio = foundEmployee.bio
        const employee = await dbContext.Employees.create(body)

        const business = await dbContext.Businesses.findById(body.businessId)
        // @ts-ignore
        const owner = await dbContext.Account.findById(business.ownerId)

        // @ts-ignore
        if (foundEmployee.notifications) {
            await courier.send({
                message: {
                    to: {
                        // @ts-ignore
                        email: foundEmployee.email,
                    },
                    template: "4XAPVNN78M4EV5K9ABKDFCK344AS",
                    data: {
                        // @ts-ignore
                        businessOwner: owner.name,
                        // @ts-ignore
                        businessName: business.name,
                    },
                },
            });
        }

        return employee
    }

}

export const employeesService = new EmployeesService();