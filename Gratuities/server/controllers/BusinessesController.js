import BaseController from "../utils/BaseController"
import { Auth0Provider } from '@bcwdev/auth0provider'
import { businessesService } from "../services/BusinessesService"

export class BusinessesController extends BaseController {
    constructor() {
        super('api/businesses')
        this.router
            .get('', this.getBusinesses)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBusinesses)

    }
    async createBusinesses(req, res, next) {
        try {
            req.body.ownerid = req.userInfo.id
            const business = await businessesService.createBusiness(req.body)
            res.send(business)
        } catch (error) {
            next(error);
        }
    }
    async getBusinesses(req, res, next) {
        try {
            const businesses = await businessesService.getBusinesses()
            res.send(businesses)
        } catch (error) {
            next(error)
        }
    }
}