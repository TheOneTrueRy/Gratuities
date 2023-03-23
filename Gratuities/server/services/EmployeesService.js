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
    async hireEmployees(body) {
        const foundEmployee = await dbContext.Account.findById(body.accountId)
        const business = await dbContext.Businesses.findById(body.businessId)
        const owner = await dbContext.Account.findById(business.ownerId)
        if(foundEmployee.id == owner.id){
            throw new Forbidden("You can't add yourself to your own business!")
        }
        // @ts-ignore
        body.employeeName = foundEmployee.name
        // @ts-ignore
        body.employeePicture = foundEmployee.picture
        // @ts-ignore
        body.employeeRating = foundEmployee.rating
        // @ts-ignore
        body.employeeBio = foundEmployee.bio
        const employee = await dbContext.Employees.create(body)
        await employee.populate('business', 'name location')

        // @ts-ignore

        // @ts-ignore
        if (foundEmployee.notifications) {
            await courier.send({
                message: {
                    to: {
                        // @ts-ignore
                        email: foundEmployee.email,
                    },
                    template: "N8ZGTV7FXS43S1NYYRNDZHMXCDZ3",
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