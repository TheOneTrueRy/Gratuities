import BaseController from "../utils/BaseController"
import { Auth0Provider } from '@bcwdev/auth0provider'
import { businessesService } from "../services/BusinessesService"
import { employeesService } from "../services/EmployeesService"

export class BusinessesController extends BaseController {
    constructor() {
        super('api/businesses')
        this.router
            .get('', this.getBusinesses)
            .get('/:businessId', this.getBusinessById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBusinesses)
            .post('/:businessId/employees', this.higherEmployees)
            .delete('/:businessId', this.deleteBusiness)

    }
    async higherEmployees(req, res, next) {
        try {
            req.body.businessId = req.params.businessId
            const employee = await employeesService.higherEmployees(req.body)
            res.send(employee)
        } catch (error) {
            next(error);
        }
    }
    async deleteBusiness(req, res, next) {
        try {
            const businessId = req.params.businessId
            const requestorId = req.userInfo.id
            const business = await businessesService.deleteBusiness(requestorId, businessId)
            res.send(business)
        } catch (error) {
            next(error);
        }
    }
    async getBusinessById(req, res, next) {
        try {
            const businessId = req.params.businessId
            const business = await businessesService.getBusinessById(businessId)
            res.send(business)
        } catch (error) {
            next(error);
        }
    }
    async createBusinesses(req, res, next) {
        try {
            req.body.ownerId = req.userInfo.id
            const business = await businessesService.createBusiness(req.body)
            res.send(business)
        } catch (error) {
            next(error);
        }
    }
    async getBusinesses(req, res, next) {
        try {
            const businesses = await businessesService.findBusinesses(req.query.name)
            res.send(businesses)
        } catch (error) {
            next(error)
        }
    }
}