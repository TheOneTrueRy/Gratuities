export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.openToFeedback = data.openToFeedback
    // TODO add additional properties if needed
  }
}
