import BaseController from "../utils/BaseController"
import { Auth0Provider } from '@bcwdev/auth0provider'

export class BusinessesController extends BaseController {
    constructor() {
        super('account')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)

    }
}