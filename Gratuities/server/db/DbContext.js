import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BusinessSchema } from '../models/Business';
import { ReviewSchema } from '../models/Review';
import { TipSchema } from '../models/Tip';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Businesses = mongoose.model('Business', BusinessSchema);

  Tips = mongoose.model('Tip', TipSchema)

  Reviews = mongoose.model('Review', ReviewSchema)
}

export const dbContext = new DbContext()
