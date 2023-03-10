
export class Review {
    constructor(data) {
        this.id = data._id
        this.body = data.body
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.createdAt = data.createdAt
        this.rating = data.rating
        this.reviewedId = data.reviewedId
    }
}