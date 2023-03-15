import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Business } from "../models/Business.js"

class BusinessesService {

    async getHighestRatedBusinesses() {
        const res = await api.get('api/businesses')
        AppState.businesses = res.data.map(b => new Business(b))
        AppState.businesses.forEach(b => {
            if (b.rating == null) {
                b.rating = 0
            }
        })
        AppState.businesses.sort(function (a, b) { return a.rating - b.rating }).reverse()
    }

    async getBusinessesByQuery(query) {
        const res = await api.get('/api/businesses', { params: { name: query.query } })
        AppState.businesses = res.data.map(b => new Business(b))
    }

    async newBusiness(formData) {
        const res = await api.post('api/businesses', formData)
        AppState.businesses.push(res.data)
        return res.data
    }

    async getMyBusiness(userId) {
        const res = await api.get('api/businesses')
        const myBusiness = res.data.filter(b => b.ownerId == userId)
        AppState.businesses = myBusiness.map(b => new Business(b))
    }

    async getBusinessById(businessId) {
        AppState.business = null
        const res = await api.get('api/businesses/' + businessId)
        AppState.business = new Business(res.data)


    }
    async removeBusiness(businessId) {
        const res = await api.delete('api/businesses/' + businessId)
        const businessIndex = AppState.businesses.findIndex(b => b.id == businessId)
        if (businessIndex >= 0) {
            AppState.businesses.splice(businessIndex, 1)
        }
    }

    async editBusiness(formData, businessId) {
        const res = await api.put('api/businesses/' + businessId, formData)
        AppState.business = new Business(res.data)
    }

    async getBusinessRating() {
        let calculatedRating = 0
        if (AppState.employees.length != 0) {
            AppState.employees.forEach(p => calculatedRating += p.rating)
            // const businessId = AppState.business?.id
            calculatedRating = calculatedRating / AppState.employees.length
            let rating = Math.round(calculatedRating * 2) / 2
            // const res = await api.put('api/businesses/' + businessId, {rating: calculatedRating})
            if (AppState.business) {
                AppState.business.rating = rating
                const res = await api.put('api/businesses/' + AppState.business.id + '/rating', { rating: rating })
            }
        }
    }
}

export const businessesService = new BusinessesService()