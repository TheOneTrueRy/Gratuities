import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ReviewSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    reviewedId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    body: { type: String, maxLength: 500 },
    rating: { type: Number, enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], required: true },
    isOpened: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })

ReviewSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})