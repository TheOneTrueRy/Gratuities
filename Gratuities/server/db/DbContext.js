import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BusinessSchema } from '../models/Business';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Businesses = mongoose.model('Business', BusinessSchema);
}

export const dbContext = new DbContext()
