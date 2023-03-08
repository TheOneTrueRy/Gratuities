import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BusinessSchema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true },
    logo: { type: String, required: true },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },

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


