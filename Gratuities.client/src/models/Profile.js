
export class Profile {
    constructor(data) {
        this.id = data._id
        this.currency = data.currency
        this.email = data.email
        this.openToFeedback = data.openToFeedback
        this.picture = data.picture
        this.bio = data.bio
        this.name = data.name
        this.rating = data.rating
    }
}