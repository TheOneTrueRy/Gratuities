
export class Business{
    constructor(data) {
        this.id = data._id
        this.name = data.name
        this.location = data.location
        this.logo = data.logo
        this.coverImg = data.coverImg
        this.ownerId = data.ownerId
        this.rating = data.rating
    }
}