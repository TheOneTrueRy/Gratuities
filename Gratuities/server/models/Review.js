import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ReviewSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'account', required: true },
    reviewedId: { type: Schema.Types.ObjectId, ref: 'account', required: true },
    body: { Type: String, maxLength: 200 },
    rating: { type: Number, enum: [0, 1, 2, 3, 4, 5], required: true },
})

ReviewSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})