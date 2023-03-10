import { Logger } from 'sass'
import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

// Private Methods

/**
 * Creates account if one does not exist
 * @param {any} account
 * @param {any} user
 */
async function createAccountIfNeeded(account, user) {
  if (!account) {
    user._id = user.id
    if (typeof user.name == 'string' && user.name.includes('@')) {
      user.name = user.nickname
    }
    account = await dbContext.Account.create({
      ...user,
      subs: [user.sub]
    })
  }
  return account
}

/**
 * Adds sub to account if not already on account
 * @param {any} account
 * @param {any} user
 */
async function mergeSubsIfNeeded(account, user) {
  if (!account.subs.includes(user.sub)) {
    // @ts-ignore
    account.subs.push(user.sub)
    await account.save()
  }
}
/**
 * Restricts changes to the body of the account object
 * @param {any} body
 */
function sanitizeBody(body) {
  const writable = {
    name: body.name,
    picture: body.picture
  }
  return writable
}

class AccountService {
  /**
   * Returns a user account from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to account if not currently on account
   * @param {any} user
   */
  async getAccount(user) {
    let account = await dbContext.Account.findOne({
      _id: user.id
    })
    account = await createAccountIfNeeded(account, user)
    await mergeSubsIfNeeded(account, user)
    return account
  }

  /**
   * Updates account with the request body, will only allow changes to editable fields
   *  @param {any} user Auth0 user object
   *  @param {any} body Updates to apply to user object
   */
  async updateAccount(user, body) {
    const account = await dbContext.Account.findById(user.id)
    if (!account) {
      throw new BadRequest('Invalid account Id')
    }

    if (body.currency < 0.01) {
      throw new BadRequest("You can't get negative money.")
    }

    account.name = body.name || account.name
    account.picture = body.picture || account.picture
    account.currency = (account.currency + body.currency) || account.currency
    account.bio = body.bio || account.bio
    account.openToFeedback = body.openToFeedback != null ? body.openToFeedback : account.openToFeedback
    account.tips = body.tips || account.tips
    account.rating = body.rating || account.rating
    // const account = await dbContext.Account.findOneAndUpdate(
    //   { _id: user.id },
    //   { $set: update },
    //   { runValidators: true, setDefaultsOnInsert: true, new: true }
    // )
    await account.save()
    return account
  }
}
export const accountService = new AccountService()
