import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // NOTE If you wish to add additional properties do so here
    currency: { type: Number, required: true, default: 0, min: 0 },
    bio: { type: String, default: '' },
    openToFeedback: { type: Boolean, default: false },
    tips: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    notifications: {type: Boolean, default: true}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

