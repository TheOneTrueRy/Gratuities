
export class Profile {
    constructor(data) {
        this.id = data.accountId || data._id
        this.currency = data.currency
        this.email = data.email
        this.openToFeedback = data.openToFeedback
        this.picture = data.picture || data.employeePicture
        this.bio = data.bio || data.employeeBio
        this.name = data.name || data.employeeName
        this.rating = data.rating || data.employeeRating
        this.businessId = data.businessId || null
    }
}

export class Employee extends Profile{
    constructor(data){
        super(data)
        this.employeeId = data._id
    }
}