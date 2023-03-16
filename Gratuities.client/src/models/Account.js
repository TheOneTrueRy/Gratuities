export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.openToFeedback = data.openToFeedback
    this.rating = data.rating
    this.currency = data.currency
    this.notifications = data.notifications
    this.theme = data.theme
    // TODO add additional properties if needed
  }
}
