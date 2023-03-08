import { Schema } from "mongoose";


export const TipSchema = new Schema({
    giverId: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
    recieverId: {type: Schema.Types.ObjectId, required: true, ref: "Account"}
}, { timestamps: true, toJSON: { virtuals: true } })

TipSchema.virtual('giver', {
    localField: "giverId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})