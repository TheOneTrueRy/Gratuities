import mongoose, { SchemaType } from 'mongoose'
const Schema = mongoose.Schema

export const EmployeeSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

EmployeeSchema.virtual('business', {
    localField: 'businessId',
    foreignField: '_id',
    justOne: true,
    ref: 'Business'
})
EmployeeSchema.virtual('employee', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})