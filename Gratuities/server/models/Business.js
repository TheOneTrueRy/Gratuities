import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BusinessSchema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    logo: { type: String, required: true, minLength: 3, maxLength: 100 },
    coverImg: { type: String, required: true, minLength: 3, maxLength: 100 },
    location: { type: String, required: true, minLength: 3, maxLength: 500 },

},
    { timestamps: true, toJSON: { virtuals: true } })


BusinessSchema.virtual('owner', {
    localField: 'ownerId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
BusinessSchema.virtual('review', {
    localField: '_id',
    foreignField: 'reviewedId',
    ref: 'BusinessReview'
})


