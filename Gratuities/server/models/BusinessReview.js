import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BusinessReviewSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'account', required: true },
    reviewedId: { type: Schema.Types.ObjectId, ref: 'account', required: true },

})

BusinessReviewSchema.virtual('', {
    localField: 'ownerId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})