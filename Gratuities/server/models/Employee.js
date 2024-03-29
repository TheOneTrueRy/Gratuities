import mongoose, { SchemaType } from 'mongoose'
const Schema = mongoose.Schema

export const EmployeeSchema = new Schema({
    businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    employeeName: { type: String, required: true },
    employeePicture: { type: String, required: true },
    employeeRating: { type: Number, required: true },
    employeeBio: {type: String, default: "I Love to be the best at what I do!"}
}, { timestamps: true, toJSON: { virtuals: true } })

EmployeeSchema.virtual('business', {
    localField: 'businessId',
    foreignField: '_id',
    justOne: true,
    ref: 'Business'
})
// EmployeeSchema.virtual('employee', {
//     localField: 'accountId',
//     foreignField: '_id',
//     justOne: true,
//     ref: 'Account'
// })

EmployeeSchema.index({ businessId: 1, accountId: 1 }, { unique: true })