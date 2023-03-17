import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BusinessSchema } from '../models/Business';
import { ChatSchema } from '../models/Chat';
import { EmployeeSchema } from '../models/Employee';
import { FeedbackSchema } from '../models/Feedback';
import { ReviewSchema } from '../models/Review';
import { TipSchema } from '../models/Tip';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Businesses = mongoose.model('Business', BusinessSchema);

  Tips = mongoose.model('Tip', TipSchema)

  Reviews = mongoose.model('Review', ReviewSchema)

  Employees = mongoose.model('Employee', EmployeeSchema)

  Feedbacks = mongoose.model('Feedback', FeedbackSchema)

  Chats = mongoose.model('Chat', ChatSchema)
}

export const dbContext = new DbContext()
