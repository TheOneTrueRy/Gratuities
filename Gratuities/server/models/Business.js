import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const BusinessSchema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    logo: { type: String, required: true, minLength: 3, maxLength: 500 },
    coverImg: { type: String, required: true, minLength: 3, maxLength: 500 },
    location: { type: String, required: true, minLength: 3, maxLength: 500 },
    rating: { type: Number, default: 0, min: .5, max: 5 }
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


