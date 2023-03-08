import BaseController from "../utils/BaseController"
import { Auth0Provider } from '@bcwdev/auth0provider'
import { businessesService } from "../services/BusinessesService"

export class BusinessesController extends BaseController {
    constructor() {
        super('api/businesses')
        this.router
            .get('', this.getBusinesses)
            .use(Auth0Provider.getAuthorizedUserInfo)

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